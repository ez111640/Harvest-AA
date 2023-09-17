import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllPins } from "../../../store/pinsReducer"
import "./LandingPage.css"
import { PinCard } from "../PinCard/PinCard"
import { getAllComments } from "../../../store/commentsReducer"
import { getUserBoards } from "../../../store/boardsReducer"
import { NavLink } from "react-router-dom"

export const SearchResults = () => {
    const dispatch = useDispatch()
    const allPins = useSelector((state) => state.pinsReducer.pins)
    const boards = useSelector((state) => state.boardsReducer.boards)
    const user = useSelector((state) => state.session.user)


    let allPinArray = []
    if (allPins) allPinArray = Object.values(allPins)


    let sortedPins = []
    if (allPinArray.length) allPinArray.map((pin) => sortedPins[pin.id] = pin)
   

    useEffect(() => {
        dispatch(getAllPins())
        dispatch(getAllComments())
        dispatch(getUserBoards())
    }, [dispatch])

    if (!allPins) return null;

    return (
        <div>
         This feature coming soon
        </div>
    )
}
