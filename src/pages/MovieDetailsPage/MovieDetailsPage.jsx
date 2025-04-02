import { useEffect, useState, useRef } from "react";
import { useParams, useLocation, Link, Outlet, NavLink } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import s from "./MovieDetailsPage.module.css"

export default function MovieDetailsPage() {
    const { movieId } = useParams();
    const location = useLocation();
    const backLinkRef = useRef(location.state?.from || "/movies"); // Store previous page

    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchMovieDetails() {
            setLoading(true);
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=54ea7ce5f3d7843885fa77f83e0b1231`);
                const data = await response.json();
                setMovie(data);
            } catch (err) {
                console.log(err);
                setError("Failed to load movie details.");
            } finally {
                setLoading(false);
            }
        }
        fetchMovieDetails();
    }, [movieId]);

    if (loading) return <Loader />;
    if (error) return <p>{error}</p>;
    if (!movie) return null;

    return (
        <div>
            <Link to={backLinkRef.current} className={s.backLink}>Go Back</Link>
            <h2>{movie.title}</h2>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className={s.poster} />
            <p>{movie.overview}</p>
            <nav className={s.nav}>
                <NavLink to="cast" className={s.linkTo}>Cast</NavLink>
                <NavLink to="reviews" className={s.linkTo}>Reviews</NavLink>
            </nav>
            <Outlet />
        </div>
    );
}
