<?php

namespace App\Http\Controllers;

use App\Models\Country;
use App\Models\Favorite;
use Illuminate\Http\Request;

class CountryController extends Controller
{
    public function index()
    {
        return response()->json(Country::orderBy('common_name')->get());
    }


    public function show($code)
    {
        $country = Country::where('country_code', $code)->firstOrFail();
        $borders = is_array($country->borders) ? $country->borders : json_decode($country->borders, true) ?? [];
        $neighbors = count($borders) > 0
            ? Country::whereIn('country_code', $borders)->get()
            : collect([]);

        $result = [
            'code' => $country->country_code,
            'common_name' => $country->common_name,
            'official_name' => $country->official_name,
            'population' => $country->population,
            'population_rank' => $country->population_rank,
            'area' => $country->area,
            'flag' => $country->flag,
            'is_favorite' => $country->isFavorited(auth()->id() ?? 1),
            'neighbors' => $neighbors->map(function ($neighbor) {
                return [
                    'code' => $neighbor->country_code,
                    'name' => $neighbor->common_name,
                ];
            }),
            'languages' => $country->languages ?? [],
        ];

        return response()->json($result);
    }


    public function search(Request $request)
    {
        $query = $request->input('query');

        if (empty($query)) {
            return response()->json([]);
        }

        $countries = Country::search($query);

        //  convert to array
        $formattedCountries = $countries->map(function ($country) {
            return [
                'code' => $country->country_code,
                'name' => $country->common_name,
                'official_name' => $country->official_name,
                'flag' => $country->flag,
            ];
        })->values()->all();

        return response()->json($formattedCountries);
    }

    public function byLanguage($languageCode)
    {
        $countries = Country::byLanguage($languageCode);

        return response()->json($countries->map(function ($country) use ($languageCode) {
            return [
                'code' => $country->country_code,
                'name' => $country->common_name,
            ];
        }));
    }


    public function toggleFavorite($countryCode)
    {
        $userId = auth()->id() ?? 1;

        $isFavorited = Favorite::toggle($userId, $countryCode);

        return response()->json([
            'is_favorite' => $isFavorited,
        ]);
    }


    public function favorites()
    {
        $userId = auth()->id() ?? 1;

        $favorites = Favorite::getUserFavorites($userId);

        return response()->json($favorites->map(function ($country) {
            return [
                'code' => $country->country_code,
                'name' => $country->common_name,
                'flag' => $country->flag,
            ];
        }));
    }




    public function languageDebug($countryCode)
    {
        $country = Country::where('country_code', $countryCode)->first();

        if (!$country) {
            return response()->json(['error' => 'Country not found']);
        }

        return response()->json([
            'country' => $country->common_name,
            'languages_raw' => $country->getAttributes()['languages'],
            'languages_parsed' => $country->languages,
            'languages_type' => gettype($country->languages)
        ]);
    }
}
