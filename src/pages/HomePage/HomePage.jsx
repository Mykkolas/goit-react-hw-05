import Loader from "../../components/Loader/Loader"
import s from "./HomePage.module.css"

function HomePage({ movies, loading, error }) {
    return (
        <div className={s.trendingContainer}>

            {loading && <Loader loading={loading} />}
            {error && alert("Error!!!")} {/* fix later */}
            {movies.map((movie) => (
                <div key={movie.id} className={s.imgContainer}>
                    <img className={s.poster} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                    <div className={s.overlay}></div>
                </div>

            ))}
        </div>
    )
}

export default HomePage