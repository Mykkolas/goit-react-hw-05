import clsx from "clsx"
import { NavLink } from "react-router-dom"
import s from "./Navigation.module.css"
import { FaHome } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";

const Navigation = () => {

    const buildLinkClass = ({ isActive }) => {
        return clsx(s.link, isActive && s.active)
    }

    return (
        <div>
            <nav className={s.navigation}>
                <NavLink to="/" className={buildLinkClass}>
                    Home<FaHome />
                </NavLink>
                <NavLink to="/movies" className={buildLinkClass}>
                    Movies<MdLocalMovies />
                </NavLink>
            </nav>
        </div>
    )
}

export default Navigation