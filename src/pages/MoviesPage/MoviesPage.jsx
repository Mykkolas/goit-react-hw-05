import { useState } from "react";
import s from "./MoviesPage.module.css"
import { MdSavedSearch } from "react-icons/md";
import Loader from "../../components/Loader/Loader";


function MoviesPage({ movies, fetchMovies, loading, error }) {

    const [query, setQuery] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        fetchMovies(query)
    }


    return (
        <>
            <div className={s.searchContainer}>
                <h2 className={s.searchHeader}>Search a movie</h2>
                <form className={s.form} onSubmit={handleSubmit} id="important">
                    <input type="text"
                        className={s.searchInput}
                        placeholder="dream film..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button className={s.searchBtn} type="submit"><MdSavedSearch className={s.icon} /></button>
                </form>
            </div>

            {error && <p>Error!</p>} {/* FIIIIXXX */}
            {loading && <Loader loading={loading} />}

            <div className={s.searchedContainer}>
                {movies.map((movie) => (
                    <div key={movie.id}>
                        {movie.poster_path ? (
                            <div className={s.shownContainer}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                    className={s.movieImage}
                                />
                                <div className={s.overlay}></div>
                            </div>
                        ) : (
                            <div className={s.fallbackImage}>
                                <p>{movie.title}</p>
                                <p className={s.notAvailable}>No image available</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>

    )
}

export default MoviesPage