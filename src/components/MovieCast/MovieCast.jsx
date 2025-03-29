import { useState, useEffect } from "react";
import s from "./MovieCast.module.css";
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from "react-icons/fa";

function MovieCast({ cast }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleCast, setVisibleCast] = useState(2);

    useEffect(() => {
        const updateVisibleCast = () => {
            if (window.innerWidth >= 1440) {
                setVisibleCast(8);
            } else if (window.innerWidth >= 768) {
                setVisibleCast(5);
            } else {
                setVisibleCast(2);
            }
        };

        updateVisibleCast();
        window.addEventListener("resize", updateVisibleCast);
        return () => window.removeEventListener("resize", updateVisibleCast);
    }, []);

    if (!cast || cast.length === 0) {
        return <p className={s.noCast}>No cast information available.</p>;
    }

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            Math.min(prevIndex + 1, cast.length - visibleCast)
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    return (
        <div className={s.sliderContainer}>
            <button className={s.arrow} onClick={prevSlide} disabled={currentIndex === 0}>
                <FaRegArrowAltCircleLeft />
            </button>
            <div className={s.slider}>
                <ul
                    className={s.castList}
                    style={{ transform: `translateX(-${currentIndex * (100 + 10)}px)` }}
                >
                    {cast.map(actor => (
                        <li key={actor.id} className={s.castItem}>
                            <img
                                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                                alt={actor.name}
                                className={s.castImage}
                            />
                            <p className={s.actorName}>{actor.name}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <button className={s.arrow} onClick={nextSlide} disabled={currentIndex >= cast.length - visibleCast}>
                <FaRegArrowAltCircleRight />
            </button>
        </div>
    );
}

export default MovieCast;
