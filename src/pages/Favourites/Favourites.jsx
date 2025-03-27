import s from "./Favourites.module.css"

function Favourites() {
    return (
        <div className={s.favDiv}>
            <p className={s.favP}>You can save up to 10 films.</p>
            <p className={s.favP}>Don't worry, your films will be here when you return.</p>
            <div className="savedFilmsContainer">

            </div>
        </div>
    )
}

export default Favourites