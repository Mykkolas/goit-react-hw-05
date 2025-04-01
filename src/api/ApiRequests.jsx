import axios from "axios";
import iziToast from "izitoast";
import 'izitoast/dist/css/iziToast.min.css';
import { useState, useCallback } from "react";

const API_KEY = "54ea7ce5f3d7843885fa77f83e0b1231";
const BASE_URL = "https://api.themoviedb.org/3";

// Custom hook for API calls
export function useMoviesAPI() {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [searchedMovies, setSearchedMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTrendingMovies = useCallback(async (timeWindow = "day") => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/trending/movie/${timeWindow}`, {
                params: { api_key: API_KEY, include_adult: false },
            });
            setError(null);
            setTrendingMovies(response.data.results.filter(film => film.poster_path));
        } catch (err) {
            console.error(err);
            setError("Failed to fetch trending movies.");
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchMoviesBySearch = useCallback(async (query) => {
        if (!query.trim()) {
            iziToast.error({
                title: 'Error',
                message: 'Input is empty',
                position: 'topRight',
                timeout: 3000,
                backgroundColor: "gold",
            });
            return;
        }
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/search/movie`, {
                params: { api_key: API_KEY, query, include_adult: false },
            });
            setError(null);
            setSearchedMovies(response.data.results.filter(film => film.poster_path));
            if (response.data.results.length === 0) {
                iziToast.error({
                    title: 'Error',
                    message: 'No movies found!',
                    position: 'topRight',
                    timeout: 3000,
                    backgroundColor: "gold",
                });
            }
        } catch (err) {
            console.error(err);
            setError("Failed to fetch movies by search!");
            iziToast.error({
                title: 'Error',
                message: 'Failed to fetch by search!',
                position: 'topRight',
                timeout: 3000,
                backgroundColor: "gold",
            });
        } finally {
            setLoading(false);
        }
    }, []);

    return { trendingMovies, searchedMovies, loading, error, fetchTrendingMovies, fetchMoviesBySearch };
}
