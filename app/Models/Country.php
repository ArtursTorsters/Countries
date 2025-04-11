<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    use HasFactory;

    protected $fillable = [
        'country_code',
        'common_name',
        'official_name',
        'population',
        'population_rank',
        'area',
        'flag',
        'borders',
        'languages',
        'translations',
    ];

    protected $casts = [
        'flag' => 'array',
        'borders' => 'array',
        'languages' => 'array',
        'translations' => 'array',
    ];

    public function getNeighborCountries()
    {
        if (!$this->borders) {
            return collect([]);
        }

        return Country::whereIn('country_code', $this->borders)->get();
    }

    /**
     *  if the country is favorited by user
     */
    public function isFavoriteByUser($userId)
    {
        return Favorite::where('user_id', $userId)
            ->where('country_code', $this->country_code)
            ->exists();
    }

    public static function searchCountriesByName($query)
    {
        return static::query()
            ->where(function ($q) use ($query) {
                $q->where('common_name', 'LIKE', "%{$query}%")
                    ->orWhere('official_name', 'LIKE', "%{$query}%")
                    ->orWhereRaw("JSON_SEARCH(LOWER(translations), 'one', ?) IS NOT NULL", ["%".strtolower($query)."%"]);
            })
            ->get();
    }


    public static function countriesByLanguage($languageCode)
    {
        return static::query()
            ->whereRaw("JSON_EXTRACT(languages, ?) IS NOT NULL", ['$."' . $languageCode . '"'])
            ->get();
    }
}
