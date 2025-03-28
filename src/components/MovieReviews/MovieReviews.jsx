import s from "./MovieReviews.module.css"
import { FaUserCircle } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
function MovieReviews({ reviews }) {
    return (
        <div>
            {reviews.length == 0 && <p className={s.noRev}>No reviews available!</p>}
            <ul className={s.revList}>
                {reviews.map((review) => (
                    <li className={s.revElem} key={review.id}>
                        <h3 className={s.revAuthor}><FaUserCircle />{review.author}</h3>
                        <p className={s.revDate}><IoTime /> {new Date(review.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}</p>
                        <p className={s.revContent}>{review.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default MovieReviews