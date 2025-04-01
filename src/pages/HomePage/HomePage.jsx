import { useEffect } from 'react';
import { useMoviesAPI } from '../../api/ApiRequests'; // Import named export
import MovieList from '../../components/MovieList/MovieList';

export default function HomePage() {
    const { trendingMovies, error, loading, fetchTrendingMovies } = useMoviesAPI();

    useEffect(() => {
        fetchTrendingMovies();
    }, [fetchTrendingMovies]);

    return (
        <div>
            <h1>Trending Movies</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {trendingMovies.length > 0 && <MovieList movies={trendingMovies} />}
        </div>
    );
}