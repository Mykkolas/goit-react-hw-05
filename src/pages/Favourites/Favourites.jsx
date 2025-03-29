import { useEffect, useState } from "react"
import s from "./Favourites.module.css"
import { IoMdClose } from "react-icons/io";
function Favourites() {

    const [favourites, setFavourites] = useState([])

    useEffect(() => {
        const storedFavourites = JSON.parse(localStorage.getItem("favourites")) || []
        setFavourites(storedFavourites)
    }, [])
    function removeFavourite(movieId) {
        const updatedFavourites = favourites.filter(movie => movie.id !== movieId)
        setFavourites(updatedFavourites)
        localStorage.setItem("favourites", JSON.stringify(updatedFavourites))
    }

    return (
        <div className={s.favContainer}>
            <div className={s.favDiv}>
                <p className={s.favP}>You can save as many films as you want.</p>
                <p className={s.favP}>Don't worry, your films will be here when you return.</p>
            </div>
            <div className={s.moviesGrid}>
                {favourites.map((movie) => (
                    <div key={movie.id} className={s.movieCard}>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className={s.movieImage} />
                        <button onClick={() => removeFavourite(movie.id)} className={s.removeBtn}>
                            <IoMdClose />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Favourites