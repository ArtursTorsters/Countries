import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import axios from "axios";
import Card from "../Components/global/Card";
import Button from "../Components/global/Button";
import Loading from "../Components/global/Loading";

export default function LanguageCountries({ code }) {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [languageName, setLanguageName] = useState("");

    useEffect(() => {
        // lang from uri
        const params = new URLSearchParams(window.location.search);
        const nameFromUrl = params.get("name");

        if (nameFromUrl) {
            setLanguageName(nameFromUrl);
        }

        const fetchCountriesByLanguage = async () => {
            try {
                const response = await axios.get(
                    `/api/languages/${code}/countries`
                );

                // convert obj to arr since the back returns it
                let countriesArray = [];
                if (Array.isArray(response.data)) {
                    countriesArray = response.data;
                } else if (
                    typeof response.data === "object" &&
                    response.data !== null
                ) {
                    countriesArray = Object.values(response.data);
                }

                setCountries(countriesArray);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchCountriesByLanguage();
    }, [code]);

    if (loading) {
        <Loading />;
    }

    return (
        <div className="min-h-screen bg-surface-light">
            <nav className="main-nav">
                <div className="section-container">
                    <Link
                        href="/"
                        className="text-2xl font-bold text-brand hover:text-brand-dark transition duration-200"
                    >
                        Country Encyclopedia
                    </Link>
                </div>
            </nav>

            <div className="py-12">
                <div className="section-container">
                    <Card shadow="lg" rounded="lg" padding="lg">
                        <h1 className="text-2xl font-bold mb-6">
                            Countries speaking {languageName}
                        </h1>

                        {countries.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {countries.map((country) => (
                                    <Link
                                        key={country.code}
                                        href={`/countries/${country.code}`}
                                        className="block p-4 border rounded hover:bg-gray-50 transition"
                                    >
                                        <h3 className="font-medium text-lg">
                                            {country.name}
                                        </h3>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600">
                                No countries found for this language.
                            </p>
                        )}

                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <Link href="/">
                                <Button
                                    variant="primary"
                                    className="flex items-center"
                                >
                                    <svg
                                        className="w-5 h-5 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                        ></path>
                                    </svg>
                                    Back to Countries
                                </Button>
                            </Link>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
