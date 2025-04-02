import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import s from "./MovieCast.module.css"

export default function MovieCast() {
    const { movieId } = useParams();
    const [cast, setCast] = useState([]);

    useEffect(() => {
        async function fetchCast() {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=54ea7ce5f3d7843885fa77f83e0b1231`);
                const data = await response.json();
                setCast(data.cast);
            } catch (error) {
                console.log("Error fetching cast:", error);
            }
        }
        fetchCast();
    }, [movieId]);

    return (
        <div>
            <ul className={s.actorList}>
                {cast.map(actor => (
                    <li key={actor.id} className={s.actorInfo}>
                        <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} />
                        {actor.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
