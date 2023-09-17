import "./Footer.css"
import { About } from "./About/About"
import OpenModalButton from "../../OpenModalButton"

export const Footer = () => {



    return (

        <div className="footer">
            <div className="open-about"><OpenModalButton buttonText="?" modalComponent={<About />} />
            </div>
        </div>
    )
}
