<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/countries/{code}', function ($code) {
    return Inertia::render('CountryDetails', ['code' => $code]);
})->name('countries.show');

Route::get('/languages/{code}/countries', function ($code) {
    return Inertia::render('LanguageCountries', ['code' => $code]);
})->name('languages.countries');
