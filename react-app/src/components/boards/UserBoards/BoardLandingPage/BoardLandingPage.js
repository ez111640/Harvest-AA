import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getBoardPins } from "../../../../store/pinsReducer"
import { useParams } from "react-router-dom"
import { getAllComments } from "../../../../store/commentsReducer"
import { PinCard } from "../../../pins/PinCard/PinCard"
import { getBoardDetails } from "../../../../store/boardsReducer"
import { NavLink } from "react-router-dom"
import "./BoardLandingPage.css"

export const BoardLandingPage = () => {
    const dispatch = useDispatch()
    const { boardId } = useParams()
    const boards = useSelector((state) => state.boardsReducer.boards)



    useEffect(() => {
        dispatch(getBoardDetails(boardId))
    }, [dispatch, boardId])

    let updatedBoard

    if (!boards) return null;
    if (boards) updatedBoard = boards[boardId]
    let pins;

    console.log("UPDATEDBOARDHERE", updatedBoard)



    if (updatedBoard?.pins) pins = (updatedBoard.pins)

    console.log(pins[0])
    return (
        <div>
            <div className="board-header">
                <div className="board-name">
                        {updatedBoard.name}
                        <div><i className="fa-solid fa-ellipsis"></i></div>
                   

                    </div>
            </div>
            <div>
                {updatedBoard.pins ?
                    <div id="all-pins">
                        {pins[0].map((pin) => (
                            <div id={pin.pinId} className="pin-photo">
                                <NavLink to={`/pins/${pin.id}`}><img alt="pin" src={pin.pin.url}></img></NavLink>
                            </div>
                        ))}
                    </div>
                    :
                    <div></div>
                }
            </div>
        </div>
    )
}
