import { RingLoader } from "react-spinners"
import s from "../Loader/Loader.module.css"
export default function Loader() {
    return (
        <div className={s.loader}>
            <RingLoader color="#FFD700" size={50} />
        </div>
    )
}