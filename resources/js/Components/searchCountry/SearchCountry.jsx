import React from 'react';
import { router } from '@inertiajs/react';
import Search from "../global/Search"
import Button from "../global/Button"
import { useCountrySearch, navigateToCountry } from './SearchHelpers'
import Loading from "../global/Loading"

export default function SearchCountry() {
    const {
        query,
        results,
        isLoading,
        showResults,
        searchRef,
        handleChange,
        setShowResults
    } = useCountrySearch();

    const handleSearch = () => {
        if (results.length > 0) {
            navigateToCountry(router, results[0].code);
        }
    };

    return (
        <div className="relative w-full" ref={searchRef}>
            <Search
                onSearch={handleSearch}
                placeholder="Search for countries..."
                value={query}
                onChange={handleChange}
                className="mb-2"
            />

            {showResults && (
                <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                    {isLoading ? (
                        <Loading />
                    ) : results.length > 0 ? (
                        <ul>
                            {results.map((country) => (
                                <li key={country.code} className="border-b last:border-b-0">
                                    <Button
                                        onClick={() => {
                                            navigateToCountry(router, country.code);
                                            setShowResults(false);
                                        }}
                                        className="block w-full text-left p-3"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-6 overflow-hidden rounded shadow-sm flex items-center justify-center">
                                                {country.flag?.png ? (
                                                    <img
                                                        src={country.flag.png}
                                                        alt={country.flag.alt || `Flag of ${country.name}`}
                                                        className="h-full w-auto object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-xs">No flag</span>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-medium">{country.name}</p>
                                                {country.official_name !== country.name && (
                                                    <p className="text-xs">{country.official_name}</p>
                                                )}
                                            </div>
                                        </div>
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    ) : query.length >= 2 ? (
                        <p className="p-4 text-center">No countries found</p>
                    ) : null}
                </div>
            )}
        </div>
    );
}
