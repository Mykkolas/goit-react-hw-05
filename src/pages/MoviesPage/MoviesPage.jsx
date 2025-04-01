import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMoviesAPI } from '../../api/ApiRequests'; // Import named export
import MovieList from '../../components/MovieList/MovieList';

export default function MoviesPage() {
    const { searchedMovies, error, loading, fetchMoviesBySearch } = useMoviesAPI();
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query') || '';

    useEffect(() => {
        if (query) {
            fetchMoviesBySearch(query);
        }
    }, [query, fetchMoviesBySearch]);

    const handleSearch = (event) => {
        event.preventDefault();
        const searchTerm = event.target.elements.search.value.trim();
        if (searchTerm) {
            setSearchParams({ query: searchTerm });
        }
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input type="text" name="search" defaultValue={query} placeholder="Search movies..." />
                <button type="submit">Search</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {searchedMovies.length > 0 && <MovieList movies={searchedMovies} />}
        </div>
    );
}
