import { Link, Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import s from "./MovieDetailsPage.module.css"
import { CiHeart } from "react-icons/ci";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import clsx from "clsx"
function MovieDetailsPage({ getMovieById, fetchCast, fetchReviews }) {
    const location = useLocation()

    const [favourites, setFavourites] = useState(() => {
        return JSON.parse(localStorage.getItem("favourites")) || []
    })
    const [activeLink, setActiveLink] = useState("")
    const { movieId: paramMovieId } = useParams()
    const movieId = paramMovieId || location.state?.movie?.id;

    useEffect(() => {
        if (!movieId) return
        fetchCast(movieId)
        fetchReviews(movieId)
    }, [movieId, fetchCast, fetchReviews])
    useEffect(() => {
        const storedFavourites = JSON.parse(localStorage.getItem("favourites")) || [];
        setFavourites(storedFavourites);
    }, []);
    const backLinkHref = location.state?.from || "/movies";
    const movie = location.state?.movie || getMovieById(movieId);
    if (!movie) return <Navigate to="/movies" replace />;

    function handleClick(option) {
        setActiveLink(option)
    }

    const isFavorite = favourites.some((fav) => fav.id === movie.id); // if the movie is added
    function toggleFavourite() {
        let updatedFavourites;
        if (isFavorite) {
            updatedFavourites = favourites.filter((fav) => fav.id !== movie.id);
        } else {
            updatedFavourites = [...favourites, movie];
        }

        setFavourites(updatedFavourites);
        localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
    }

    return (
        <div className={s.detailsContainer}>
            <div className={s.buttonsLink}>
                <Link to={backLinkHref} className={s.backButton}>
                    <FaLongArrowAltLeft className={s.arrowLink} />
                </Link>
                <button onClick={toggleFavourite} className={isFavorite ? s.savedHeartBtn : s.heartBtn}>
                    {isFavorite ? <FaHeart /> : <CiHeart />}
                </button>
            </div>
            <div className={s.tabletInfos}>

                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className={s.detailsImage} />
                <div>
                    <div className={s.infosContainer}>
                        <h2>{movie.title}</h2>
                        <p>{movie.overview}</p>
                        <p>Release Date: {movie.release_date}</p>
                        <p>Rating: {movie.vote_average}</p>
                    </div>
                    <div className={s.linkContainer}>
                        <Link to="reviews" className={clsx(s.reviewLink, activeLink === "reviews" && s.active)} onClick={() => handleClick("reviews")} state={{ from: backLinkHref }}>Reviews</Link>
                        <Link to="cast" className={clsx(s.castLink, activeLink === "cast" && s.active)} onClick={() => handleClick("cast")} state={{ from: backLinkHref }}>Cast</Link>
                    </div>
                </div>
            </div>
            <Outlet />
        </div >
    )
}

export default MovieDetailsPage