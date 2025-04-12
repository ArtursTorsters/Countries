import React from "react";
import SearchCountry from "@/Components/searchCountry/SearchCountry";
import FavoriteCountries from "@/Components/FavoriteCountries";

export default function Home() {
    return (
        <>
            <div className="min-h-screen">
                <nav className="bg-slate-500 shadow-sm py-4">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-2xl font-semibold">
                            Country Encyclopedia
                        </h1>
                        <p className="mb-6">
                            Here you can search and add any country to your
                            favorites!
                        </p>
                    </div>
                </nav>

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="mb-8">
                            <div className="shadow-sm rounded-lg p-6">
                                <h2 className="text-3xl font-bold mb-4">
                                    Search Countries
                                </h2>
                                <p className="mb-6">
                                    Search for any country by name or in any
                                    translation (e.g., "Latvia", "Läti", or
                                    "Letónia").
                                </p>
                                <SearchCountry />
                            </div>
                        </div>

                        <div className="overflow-hidden shadow-sm rounded-lg p-6">
                            <h2 className="text-3xl font-bold mb-6">
                                Your Favorite Countries
                            </h2>
                            <FavoriteCountries />
                        </div>
                    </div>
                </div>

                <footer className="mt-12 py-6">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <p className="text-center">
                            Country Encyclopedia &copy;{" "}
                            {new Date().getFullYear()}
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}
