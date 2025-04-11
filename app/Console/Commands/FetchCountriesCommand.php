<?php

namespace App\Console\Commands;

use App\Models\Country;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;

class FetchCountriesCommand extends Command
{
    protected $signature = 'countries:fetch';
    protected $description = 'Fetch countries data from restcountries.com API and populate the database';

    public function handle()
    {
        $this->info('Fetching countries data...');

        try {
            $response = Http::get('https://restcountries.com/v3.1/all');

            if (!$response->successful()) {
                $this->error('Failed to fetch countries data: ' . $response->status());
                return 1;
            }

            $countries = $response->json();
            $this->info('Retrieved ' . count($countries) . ' countries');

            DB::beginTransaction();

            try {
                $countForRanking = [];
                foreach ($countries as $countryData) {
                    if (isset($countryData['population'])) {
                        $countForRanking[] = [
                            'code' => $countryData['cca3'],
                            'population' => $countryData['population'],
                        ];
                    }

                    Country::updateOrCreate(
                        ['country_code' => $countryData['cca3']],
                        [
                            'common_name' => $countryData['name']['common'] ?? 'Unknown',
                            'official_name' => $countryData['name']['official'] ?? 'Unknown',
                            'population' => $countryData['population'] ?? 0,
                            'area' => $countryData['area'] ?? null,
                            'flag' => json_encode([
                                'png' => $countryData['flags']['png'] ?? null,
                                'svg' => $countryData['flags']['svg'] ?? null,
                                'alt' => $countryData['flags']['alt'] ?? null,
                            ]),
                            'borders' => isset($countryData['borders']) ? json_encode($countryData['borders']) : null,
                            'languages' => isset($countryData['languages']) ? json_encode($countryData['languages']) : null,
                            'translations' => isset($countryData['translations']) ? json_encode($countryData['translations']) : null,
                        ]
                    );
                }

                usort($countForRanking, function ($a, $b) {
                    return $b['population'] <=> $a['population'];
                });

                foreach ($countForRanking as $index => $country) {
                    $rank = $index + 1;
                    Country::where('country_code', $country['code'])->update(['population_rank' => $rank]);
                }

                DB::commit();
                $this->info('Database populated successfully!');
            } catch (\Exception $e) {
                DB::rollBack();
                $this->error('Failed to populate database: ' . $e->getMessage());
                return 1;
            }
        } catch (\Exception $e) {
            $this->error('An error occurred: ' . $e->getMessage());
            return 1;
        }

        return 0;
    }
}
