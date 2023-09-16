import OpenModalButton from "../../OpenModalButton"
import { About } from "./About/About"
import "./Footer.css"

export const Footer = () => {



    return (

        <div className="footer">
            <div className="open-about"><OpenModalButton buttonText="?" modalComponent={<About />} />
            </div>
        </div>
    )
}
