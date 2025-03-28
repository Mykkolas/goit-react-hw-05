import { Link, Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import s from "./MovieDetailsPage.module.css"
import { CiHeart } from "react-icons/ci";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import clsx from "clsx"
function MovieDetailsPage({ getMovieById, fetchCast, fetchReviews }) {

    const [activeLink, setActiveLink] = useState("")
    const { movieId } = useParams()
    useEffect(() => {
        if (!movieId) return
        fetchCast(movieId)
        fetchReviews(movieId)
    }, [movieId])
    const location = useLocation()
    const [saved, setSaved] = useState(false)
    const backLinkHref = location.state?.from || "/movies";
    const movie = getMovieById(movieId)
    if (!movie) return <Navigate to="/movies" replace />;

    function handleClick(option) {
        setActiveLink(option)
    }



    return (
        <div className={s.detailsContainer}>
            <div className={s.buttonsLink}>
                <Link to={backLinkHref} className={s.backButton}>
                    <FaLongArrowAltLeft className={s.arrowLink} />
                </Link>
                {saved ? <button onClick={() => setSaved(false)} className={s.savedHeartBtn}><FaHeart /></button>
                    : <button onClick={() => setSaved(true)} className={s.heartBtn}><CiHeart /></button>
                }
            </div>
            {movie.poster_path ? (
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className={s.detailsImage} />
            ) : (
                <div className={s.fallbackImage}>
                    <p>{movie.title}</p>
                    <p className={s.notAvailable}>No image available</p>
                </div>
            )}
            <div className={s.infosContainer}>
                <h2>{movie.title}</h2>
                <p>{movie.overview}</p>
                <p>Release Date: {movie.release_date}</p>
                <p>Rating: {movie.vote_average}</p>
            </div>
            <div className={s.linkContainer}>
                <Link to="reviews" className={clsx(s.reviewLink, activeLink === "reviews" && s.active)} onClick={() => handleClick("reviews")}>Reviews</Link>
                <Link to="cast" className={clsx(s.castLink, activeLink === "cast" && s.active)} onClick={() => handleClick("cast")}>Cast</Link>
            </div>
            <Outlet />
        </div >
    )
}

export default MovieDetailsPage