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

    public static function countriesByLanguage($languageCode)
    {
        return static::query()
            ->whereRaw("JSON_EXTRACT(languages, ?) IS NOT NULL", ['$."' . $languageCode . '"'])
            ->get();
    }

    public static function search($query)
    {
        if (empty($query)) {
            return collect([]);
        }

        $pattern = '/' . preg_quote($query, '/') . '/i';
        $allCountries = static::all();

        return $allCountries->filter(function($country) use ($pattern) {
            if (preg_match($pattern, $country->common_name) ||
                preg_match($pattern, $country->official_name)) {
                return true;
            }
            $translations = is_array($country->translations)
                ? $country->translations
                : json_decode($country->translations, true);

            if (!is_array($translations)) {
                return false;
            }
            foreach ($translations as $langCode => $translation) {
                if ((isset($translation['common']) && preg_match($pattern, $translation['common'])) ||
                    (isset($translation['official']) && preg_match($pattern, $translation['official']))) {
                    return true;
                }
            }

            return false;
        });
    }
}
