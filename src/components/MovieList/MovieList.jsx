import { Link, useLocation } from 'react-router-dom';
import s from './MovieList.module.css';

export default function MovieList({ movies }) {
    const location = useLocation();

    return (
        <div className={s.listContainer}>
            {movies.map((movie) => (
                <div key={movie.id} className={s.imgContainer}>
                    <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                        <img className={s.poster} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                    </Link>
                </div>
            ))}
        </div>
    );
}
