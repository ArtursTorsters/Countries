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

    public function neighbors()
    {
        $borders = is_array($this->borders) ? $this->borders : json_decode($this->borders, true) ?? [];

        if (empty($borders)) {
            return collect([]);
        }

        return Country::whereIn('country_code', $borders)->get();
    }

    public function isFavorited($userId)
    {
        return Favorite::where('user_id', $userId)
            ->where('country_code', $this->country_code)
            ->exists();
    }

    public static function byLanguage($languageCode)
    {
        return static::all()->filter(function($country) use ($languageCode) {
            $languages = is_array($country->languages)
                ? $country->languages
                : json_decode($country->languages, true);

            return is_array($languages) && isset($languages[$languageCode]);
        });
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
