import { useState } from "react";
import Loader from "../../components/Loader/Loader"
import s from "./HomePage.module.css"
import clsx from "clsx"
import { Link } from "react-router-dom";
function HomePage({ movies, loading, error, fetchTrending }) {

    const [activeTab, setActiveTab] = useState("day")

    function handleClick(timeWindow) {
        setActiveTab(timeWindow);
        fetchTrending(timeWindow);
    }

    return (
        <>
            <div className={s.buttonsContainer}>
                <h2 className={s.homeHeader}>Trending</h2>

                <button
                    className={clsx(s.trendsButton, activeTab === "day" && s.active)}
                    onClick={() => handleClick("day")}
                >
                    Today
                </button>
                <button
                    className={clsx(s.trendsButton, activeTab === "week" && s.active)}
                    onClick={() => handleClick("week")}
                >
                    This Week
                </button>
            </div>
            <div className={s.trendingContainer}>

                {loading && <Loader loading={loading} />}
                {error && alert("Error!!!")} {/* fix later */}
                {movies.map((movie) => (
                    <div key={movie.id} className={s.imgContainer}>
                        <Link to={`/movies/${movie.id}`} state={{ from: location.pathname }}>
                            <img className={s.poster} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                            <div className={s.overlay}></div>
                        </Link>
                    </div>

                ))}
            </div>
        </>
    )
}

export default HomePage