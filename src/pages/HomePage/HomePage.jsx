import { useEffect } from 'react';
import { useMoviesAPI } from '../../api/ApiRequests'; // Import named export
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import s from "./HomePage.module.css"
export default function HomePage() {
    const { trendingMovies, error, loading, fetchTrendingMovies } = useMoviesAPI();

    useEffect(() => {
        fetchTrendingMovies();
    }, [fetchTrendingMovies]);

    return (
        <div className={s.containerHome}>
            <h1 className={s.headerTrends}>Trending Movies</h1>
            {loading && <Loader />}
            {error && <p>{error}</p>}
            {trendingMovies.length > 0 && <MovieList movies={trendingMovies} />}
        </div>
    );
}