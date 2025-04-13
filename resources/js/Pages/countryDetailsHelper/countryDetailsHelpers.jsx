import { useState, useEffect } from 'react';
import axios from 'axios';

export const useCountryDetails = (code) => {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/countries/${code}`);
        const countryData = {
          ...response.data,
          flag: typeof response.data.flag === "string"
            ? JSON.parse(response.data.flag)
            : response.data.flag,
          languages: typeof response.data.languages === "string"
            ? JSON.parse(response.data.languages)
            : response.data.languages,
        };
        setCountry(countryData);
        setError(null);
      } catch (err) {
        console.error("Error fetching country details:", err);
        setError("Failed to load country details");
      } finally {
        setLoading(false);
      }
    };

    if (code) {
      fetchCountryDetails();
    }
  }, [code]);

  const toggleFavorite = async () => {
    if (!country) return;

    try {
      const response = await axios.post(`/api/countries/${code}/favorite`);
      setCountry({
        ...country,
        is_favorite: response.data.is_favorite,
      });
      return response.data.is_favorite;
    } catch (err) {
      console.error("Failed to toggle favorite status:", err);
      return null;
    }
  };

  return {
    country,
    loading,
    error,
    toggleFavorite
  };
};
