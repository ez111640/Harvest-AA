import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllPins } from "../../../store/pinsReducer"
import { PinCard } from "../PinCard/PinCard"
import "./LandingPage.css"

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
    return (
        <div id="all-pins">
            {
                userPins.map((pin) => (
                    <div id={pin.id}>
                    <PinCard pin={pin} />
                </div>
                ))
            }
        </div>
    )
}
