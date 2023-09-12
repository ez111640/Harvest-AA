import { useDispatch, useSelector } from "react-redux"
import OpenModalButton from "../../OpenModalButton"
import UpdatePinModal from "../UpdatePinModal"
import "./PinCard.css"
import { NavLink } from "react-router-dom"
import { useEffect } from "react"
import { getAllPins, getOnePinThunk } from "../../../store/pinsReducer"


export const PinCard = ({pinId}) => {
    console.log("PINCARD", pinId)
    const dispatch = useDispatch()
    const pins = useSelector((state) => state.pinsReducer.pins)
    const allPins = Object.values(pins)

    // const thisPin = allPins.find((pin) => pin.id == pinId)
    const thisPin = useSelector((state) => state.pinsReducer.pin)
    console.log("THISPIN IN PINCARD", thisPin)

    useEffect(() => {
        getAllPins()
        getOnePinThunk(pinId)
    }, [dispatch])
    return (
        <div className="pin-photo">
            {thisPin?.url ?
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
