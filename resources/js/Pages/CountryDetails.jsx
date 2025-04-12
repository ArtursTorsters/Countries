// resources/js/Pages/CountryDetails.jsx
import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';

export default function CountryDetails({ code }) {
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCountryDetails = async () => {
            try {
                const response = await axios.get(`/api/countries/${code}`);
                setCountry(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load country details");
                setLoading(false);
            }
        };

        fetchCountryDetails();
    }, [code]);

    const toggleFavorite = async () => {
        if (!country) return;

        try {
            const response = await axios.post(`/api/countries/${code}/favorite`);
            setCountry({
                ...country,
                is_favorite: response.data.is_favorite
            });
        } catch (err) {
            console.error("Failed to toggle favorite status", err);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
            </div>
        </div>
    );

    if (!country) return null;

    return (
        <>
            <Head title={country.common_name} />

            <div className="min-h-screen bg-gray-50">
                <nav className="bg-white shadow-sm py-4">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-2xl font-semibold text-gray-800">Country Encyclopedia</h1>
                    </div>
                </nav>

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h1 className="text-3xl font-bold text-blue-600">{country.common_name}</h1>
                                        <p className="text-gray-600">{country.official_name}</p>
                                    </div>
                                    <button
                                        onClick={toggleFavorite}
                                        className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100"
                                    >
                                        <svg
                                            className={`w-6 h-6 ${country.is_favorite ? "text-red-500 fill-red-500" : "text-gray-400"}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <div className="mb-4">
                                            <h2 className="font-semibold text-lg mb-2">Flag</h2>
                                            {country.flag && country.flag.png ? (
                                                <img
                                                    src={country.flag.png}
                                                    alt={`Flag of ${country.common_name}`}
                                                    className="h-32 border shadow-sm"
                                                />
                                            ) : (
                                                <div className="h-32 w-full bg-gray-200 flex items-center justify-center">
                                                    No flag available
                                                </div>
                                            )}
                                        </div>

                                        <div className="mb-4">
                                            <h2 className="font-semibold text-lg mb-2">Country Information</h2>
                                            <ul className="space-y-2">
                                                <li><span className="font-medium">Code:</span> {country.code}</li>
                                                <li><span className="font-medium">Population:</span> {country.population.toLocaleString()}</li>
                                                <li><span className="font-medium">Population Rank:</span> {country.population_rank}</li>
                                                <li><span className="font-medium">Area:</span> {country.area ? `${country.area.toLocaleString()} km²` : 'N/A'}</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="mb-4">
                                            <h2 className="font-semibold text-lg mb-2">Languages</h2>
                                            {country.languages && Object.keys(country.languages).length > 0 ? (
                                                <ul className="space-y-1">
                                                    {Object.entries(country.languages).map(([code, name]) => (
                                                        <li key={code}>
                                                            <Link
                                                                href={`/languages/${code}/countries`}
                                                                className="text-blue-600 hover:text-blue-800 hover:underline"
                                                            >
                                                                {name} ({code})
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="text-gray-500">No language information available</p>
                                            )}
                                        </div>

                                        <div className="mb-4">
                                            <h2 className="font-semibold text-lg mb-2">Neighboring Countries</h2>
                                            {country.neighbors && country.neighbors.length > 0 ? (
                                                <ul className="space-y-1">
                                                    {country.neighbors.map(neighbor => (
                                                        <li key={neighbor.code}>
                                                            <Link
                                                                href={`/countries/${neighbor.code}`}
                                                                className="text-blue-600 hover:text-blue-800 hover:underline"
                                                            >
                                                                {neighbor.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="text-gray-500">This country has no neighbors (island nation)</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <Link
                                        href="/"
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md"
                                    >
                                        ← Back to Countries
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="mt-12 py-6">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <p className="text-center">Country Encyclopedia &copy; {new Date().getFullYear()}</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
