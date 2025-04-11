<?php

use App\Http\Controllers\CountryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/countries', [CountryController::class, 'index']);
Route::get('/countries/search', [CountryController::class, 'search']);
Route::get('/countries/favorites', [CountryController::class, 'favorites']);
Route::get('/countries/{code}', [CountryController::class, 'show']);
Route::post('/countries/{code}/favorite', [CountryController::class, 'toggleFavorite']);
Route::get('/languages/{code}/countries', [CountryController::class, 'byLanguage']);
