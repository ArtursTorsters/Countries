import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import Loader from "./global/Loading";
import axios from "axios";

export default function FavoriteCountries() {
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFavorites = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get("/api/countries/favorites");
                setFavorites(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFavorites();
    }, []);

    return (
        <div className="rounded-md bg-white overflow-hidden">
            {isLoading ? (
                <Loader />
            ) : favorites.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {favorites.map((country) => {
                        const flagData = typeof country.flag === 'string'
                            ? JSON.parse(country.flag)
                            : country.flag;

                        return (
                            <Link
                                key={country.code}
                                href={`/countries/${country.code}`}
                                className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 border border-gray-200"
                            >
                                <div className="w-10 h-6 mr-3 overflow-hidden rounded shadow-sm bg-gray-100 flex items-center justify-center">
                                    {flagData?.png ? (
                                        <img
                                            src={flagData.png}
                                            alt={
                                                flagData.alt ||
                                                `Flag of ${country.name}`
                                            }
                                            className="h-full w-auto object-cover"
                                        />
                                    ) : (
                                        <span className="text-xs">No flag</span>
                                    )}
                                </div>
                                <span className="font-medium text-gray-800 truncate">
                                    {country.name}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            ) : (
                <div className="py-4 text-center text-gray-500 ">
                    <svg
                        className="w-16 h-16 mx-auto mb-4 text-gray-300"
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
                    Don't have any favorite countries yet.
                    <p className="mt-2 text-sm">
                        Browse countries and click the heart icon to add to
                        favorites.
                    </p>
                </div>
            )}
        </div>
    );
}
