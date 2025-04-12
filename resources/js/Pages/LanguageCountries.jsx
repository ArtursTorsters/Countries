import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import axios from 'axios';

export default function LanguageCountries({ auth, code }) {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [languageName, setLanguageName] = useState('');

    useEffect(() => {
        const fetchCountriesByLanguage = async () => {
            try {
                const response = await axios.get(`/api/languages/${code}/countries`);
                setCountries(response.data);

                // Set language name from the first country
                if (response.data.length > 0) {
                    setLanguageName(response.data[0].language_name);
                }

                setLoading(false);
            } catch (err) {
                setError("Failed to load countries for this language");
                setLoading(false);
            }
        };

        fetchCountriesByLanguage();
    }, [code]);

    if (loading) return (
        <AuthenticatedLayout user={auth.user}>
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        </AuthenticatedLayout>
    );

    if (error) return (
        <AuthenticatedLayout user={auth.user}>
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
            </div>
        </AuthenticatedLayout>
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Countries speaking {languageName || code}
            </h2>}
        >
            <Head title={`Countries speaking ${languageName || code}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h1 className="text-2xl font-bold mb-6">
                                Countries speaking {languageName || code}
                            </h1>

                            {countries.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {countries.map(country => (
                                        <Link
                                            key={country.code}
                                            href={`/countries/${country.code}`}
                                            className="block p-4 border rounded-md hover:bg-gray-50 transition duration-150"
                                        >
                                            <h3 className="font-medium text-lg">{country.name}</h3>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-600">No countries found for this language.</p>
                            )}

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
        </AuthenticatedLayout>
    );
}
