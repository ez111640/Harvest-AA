import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllPins } from "../../../store/pinsReducer"
import "./LandingPage.css"
import { PinCard } from "../PinCard/PinCard"
import { getAllComments } from "../../../store/commentsReducer"
import { getUserBoards } from "../../../store/boardsReducer"

export const LandingPage = () => {
    const dispatch = useDispatch()
    const allPins = useSelector((state) => state.pinsReducer.pins)
    const boards = useSelector((state) => state.boardsReducer.boards)
    
    let allPinArray = []
    console.log("ALLPINS", allPins)
    if (allPins) allPinArray = Object.values(allPins)

    useEffect(() => {
        dispatch(getAllPins())
        dispatch(getAllComments())
        dispatch(getUserBoards())
    }, [dispatch])

    if (!allPins) return null;

    return (
        <div>
            {allPinArray ? <div id="all-pins">
                {allPinArray.map((pin) => (
                    <div id={pin.id}>
                        <PinCard pin={pin} />
                    </div>
                ))}
            </div> :
                <div></div>
            }
        </div>
    )
}
