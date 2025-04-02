import { Link } from "react-router-dom"
import s from "./NotFoundPage.module.css"

function NotFoundPage() {
    return (

        <div className={s.notFound}>
            <h2>INVALID URL</h2>

            <Link className={s.redirect} to={'/'}>Go Home</Link>
        </div>
    )
}

export default NotFoundPage