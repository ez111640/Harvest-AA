import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllPins } from "../../../store/pinsReducer"
import { PinCard } from "../PinCard/PinCard"
import "./UserPins.css"
import { NavLink } from "react-router-dom"


export const UserPins = () => {
    const pins = useSelector((state) => state.pinsReducer.pins)
    const user = useSelector((state) => state.session.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllPins())
    }, [dispatch])

    if (!pins) return null

    const pinArray = Object.values(pins)
    console.log(pinArray)
    let userPins = pinArray.filter((pin) => pin.userId === user.id)

    console.log(userPins)
    if (!userPins) return null;
    return (
        <div id="all-pins">
            {
                userPins.map((pin) => (
                    <div className="pin-photo">
                        <NavLink to={`/pins/${pin.id}`} pinId={pin.id}><img alt="pin" src={pin.url}></img></NavLink>
                    </div>
                ))
            }
        </div >
    )
}
