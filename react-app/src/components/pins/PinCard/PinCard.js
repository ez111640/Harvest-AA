import { useSelector } from "react-redux"
import OpenModalButton from "../../OpenModalButton"
import UpdatePinModal from "../UpdatePinModal"
import "./PinCard.css"
import { NavLink } from "react-router-dom"


export const PinCard = (pin) => {
    console.log("PIN", pin)

    const thisPin = pin.pin

    if (!pin) return null;
    if (!thisPin.url) return null;
    return (
        <div className="pin-photo">
            {thisPin.url ?
                <div>
                    <NavLink to={`/pins/${thisPin.id}`}><img alt="pin" src={thisPin.url}></img></NavLink>
                    {/* <OpenModalButton
                buttonText="Update"
                modalComponent={<UpdatePinModal pinId={thisPin.id} />}

            /> */}
                </div> :
                <div>
                    This pin has no photo
                </div>
            }

        </div>
    )
}
