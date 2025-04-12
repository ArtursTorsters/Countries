import { useState, useEffect, useRef } from "react";
import axios from "axios";

export const useCountrySearch = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef(null);

    const fetchResults = async (searchQuery) => {
        if (searchQuery.length < 2) {
            setResults([]);
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.get(
                `/api/countries/search?query=${encodeURIComponent(searchQuery)}`
            );
console.log(response);

            //flag JSON
            const parsedResults = response.data.map((country) => ({
                ...country,
                flag:
                    typeof country.flag === "string"
                        ? JSON.parse(country.flag)
                        : country.flag,
            }));

            setResults(parsedResults);
            setShowResults(true);
        } catch (error) {
            console.error("Error searching countries:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (query.length >= 2) {
            fetchResults(query);
        } else {
            setResults([]);
            setShowResults(false);
        }
    }, [query]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target)
            ) {
                setShowResults(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        setShowResults(newQuery.length >= 2);
    };

    const clearSearch = () => {
        setQuery("");
        setResults([]);
        setShowResults(false);
    };

    return {
        query,
        setQuery,
        results,
        isLoading,
        showResults,
        searchRef,
        handleChange,
        clearSearch,
        setShowResults,
    };
};

export const navigateToCountry = (router, code) => {
    router.visit(`/countries/${code}`);
};
