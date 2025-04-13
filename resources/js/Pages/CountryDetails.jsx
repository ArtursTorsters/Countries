import React from "react";
import { Link } from "@inertiajs/react";
import Card from "../Components/global/Card";
import Button from "../Components/global/Button";
import { useCountryDetails } from "../Pages/countryDetailsHelper/countryDetailsHelpers";

export default function CountryDetails({ code }) {
    const { country, loading, error, toggleFavorite } = useCountryDetails(code)

    if (!country) return null;

    return (
        <>
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
                        <Card
                            shadow="lg"
                            rounded="lg"
                            padding="lg"
                            className="overflow-hidden"
                        >
                            <div className="page-header -m-6 mb-6">
                                {country.flag?.png && (
                                    <div
                                        className="header-bg-blur"
                                        style={{
                                            backgroundImage: `url(${country.flag.png})`,
                                        }}
                                    ></div>
                                )}
                                <div className="page-header-content">
                                    <h1 className="page-header-title">
                                        {country.common_name}
                                    </h1>
                                </div>
                            </div>

                            <div className="flex justify-between items-start mb-8">
                                <p className="text-xl italic">
                                    {country.official_name}
                                </p>
                                <Button
                                    onClick={toggleFavorite}
                                    className="p-2 rounded-full hover:bg-surface-hover"
                                >
                                    <svg
                                        className={`w-7 h-7 ${
                                            country.is_favorite
                                                ? "text-red-500 fill-red-500"
                                                : "text-text-muted"
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                        ></path>
                                    </svg>
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* left*/}
                                <div>
                                    <Card title="Flag" className="mb-6">
                                        <div className="flex justify-center">
                                            {country.flag?.png ? (
                                                <img
                                                    src={country.flag.png}
                                                    className="h-40 border border-gray-200 shadow-sm rounded"
                                                />
                                            ) : (
                                                <div className="h-40 w-full bg-surface-hover flex items-center justify-center rounded">
                                                    <span className="text-text-muted">
                                                        No flag available
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </Card>

                                    <Card
                                        title="Country Information"
                                        className="mb-6"
                                    >
                                        <div className="info-grid">
                                            <div className="info-item">
                                                <div className="info-label">
                                                    Common name
                                                </div>
                                                <div className="info-value">
                                                    {country.common_name}
                                                </div>
                                            </div>
                                            <div className="info-item">
                                                <div className="info-label">
                                                    Country Code
                                                </div>
                                                <div className="info-value">
                                                    {country.code}
                                                </div>
                                            </div>
                                            <div className="info-item">
                                                <div className="info-label">
                                                    Population
                                                </div>
                                                <div className="info-value">
                                                    {country.population.toLocaleString()}
                                                </div>
                                            </div>
                                            <div className="info-item">
                                                <div className="info-label">
                                                    Population Rank
                                                </div>
                                                <div className="info-value">
                                                    {country.population_rank ||
                                                        "N/A"}
                                                </div>
                                            </div>
                                            <div className="info-item">
                                                <div className="info-label">
                                                    Area
                                                </div>
                                                <div className="info-value">
                                                    {country.area
                                                        ? `${country.area.toLocaleString()} km²`
                                                        : "N/A"}
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </div>

                                {/* right */}
                                <div>
                                    <Card title="Languages" className="mb-6">
                                        {country.languages &&
                                        Object.keys(country.languages).length >
                                            0 ? (
                                            <div className="flex flex-wrap gap-2">
                                                {Object.entries(
                                                    country.languages
                                                ).map(([code, name]) => (
                                                    <Link
                                                        key={code}
                                                        href={`/languages/${code}/countries?name=${encodeURIComponent(
                                                            name
                                                        )}`}
                                                        className="language-tag"
                                                    >
                                                        {name} ({code})
                                                    </Link>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-text-muted italic">
                                                No language information
                                                available
                                            </p>
                                        )}
                                    </Card>

                                    <Card
                                        title="Neighboring Countries"
                                        className="mb-6"
                                    >
                                        {country.neighbors &&
                                        country.neighbors.length > 0 ? (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                {country.neighbors.map(
                                                    (neighbor) => (
                                                        <Link
                                                            key={neighbor.code}
                                                            href={`/countries/${neighbor.code}`}
                                                            className="neighbor-link"
                                                        >
                                                            <svg
                                                                className="w-5 h-5 text-text-muted"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                ></path>
                                                            </svg>
                                                            <span className="font-medium">
                                                                {neighbor.name}
                                                            </span>
                                                        </Link>
                                                    )
                                                )}
                                            </div>
                                        ) : (
                                            <div className="bg-surface-light p-3 rounded italic text-center">
                                                no data{" "}
                                            </div>
                                        )}
                                    </Card>
                                </div>
                            </div>

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
                                        Back to Countries search page
                                    </Button>
                                </Link>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
