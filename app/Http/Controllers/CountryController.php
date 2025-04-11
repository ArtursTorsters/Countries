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

        $neighbors = $country->neighbors();

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

        return response()->json($countries->map(function ($country) {
            return [
                'code' => $country->country_code,
                'name' => $country->common_name,
                'official_name' => $country->official_name,
                'flag' => $country->flag,
            ];
        }));
    }


    public function byLanguage($languageCode)
    {
        $countries = Country::byLanguage($languageCode);

        return response()->json($countries->map(function ($country) use ($languageCode) {
            return [
                'code' => $country->country_code,
                'name' => $country->common_name,
                'language_name' => $country->languages[$languageCode] ?? $languageCode,
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
}
