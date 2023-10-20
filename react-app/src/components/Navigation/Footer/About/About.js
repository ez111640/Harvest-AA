import "./About.css"
import { Link } from "react-router-dom"


export const About = () => {

    return (

        <div className="about-container">

            <div className="about-image"><img src="https://media.licdn.com/dms/image/D4E03AQExbSO-orZanQ/profile-displayphoto-shrink_800_800/0/1693175484136?e=1700092800&v=beta&t=-A7cU8fvmlMxKDxndPEjemJ1CDj1oOWOagyl79QZZgM"></img></div>
            <div className="about-name">Erica Zimmerman</div>
            <div className="about-external-links" onClick={()=>window.open("https://github.com/ez111640")}>Github<i className="fa-solid fa-square-arrow-up-right"></i></div>
            <div className="about-external-links" onClick={()=>window.open("https://www.linkedin.com/in/erica-zimmerman-15168a28a/")}>LinkedIn<i className="fa-solid fa-square-arrow-up-right"></i></div>

        </div>

    )
}
