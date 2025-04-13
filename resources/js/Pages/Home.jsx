import React from "react";
import SearchCountry from "@/Components/searchCountry/SearchCountry";
import FavoriteCountries from "@/Components/FavoriteCountries";
import Card from "@/Components/global/Card";

export default function Home() {
    return (
        <>
            <div className="min-h-screen bg-surface-light">
                <nav className="main-nav">
                    <div className="section-container">
                        <h1 className="text-2xl font-bold text-brand">
                            Country Encyclopedia
                        </h1>
                        <p className="text-text-light mt-2">
                            Here you can search and add any country to your
                            favorites!
                        </p>
                    </div>
                </nav>

                <div className="py-12">
                    <div className="section-container">
                        <div className="mb-8">
                            <Card shadow="md" rounded="lg" padding="lg" className="bg-white">
                                <h2 className="text-3xl font-bold mb-4 text-text">
                                    Search Countries
                                </h2>
                                <p className="mb-6 text-text-light">
                                    Search for any country by name or in any
                                    translation (e.g., "Latvia", "Läti", or
                                    "Letónia").
                                </p>
                                <SearchCountry />
                            </Card>
                        </div>

                        <Card shadow="md" rounded="lg" padding="lg" className="bg-white">
                            <h2 className="text-3xl font-bold mb-6 text-text">
                                Your Favorite Countries
                            </h2>
                            <FavoriteCountries />
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
