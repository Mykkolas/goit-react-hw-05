import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MovieReviews() {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        async function fetchReviews() {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=54ea7ce5f3d7843885fa77f83e0b1231`);
                const data = await response.json();
                setReviews(data.results);
            } catch (error) {
                console.log("Error fetching reviews:", error);
            }
        }
        fetchReviews();
    }, [movieId]);

    return (
        <div>
            {reviews.length === 0 ? (
                <p>No reviews available.</p>
            ) : (
                <ul>
                    {reviews.map(review => (
                        <li key={review.id}>
                            <strong>{review.author}:</strong> {review.content}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
