import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getBoardPins } from "../../../../store/pinsReducer"
import { useParams } from "react-router-dom"
import { getAllComments } from "../../../../store/commentsReducer"
import { PinCard } from "../../../pins/PinCard/PinCard"
import { getBoardDetails, getUserBoards } from "../../../../store/boardsReducer"
import { NavLink, Link } from "react-router-dom"
import "./BoardLandingPage.css"
import OpenModalButton from "../../../OpenModalButton"
import UpdateBoardModal from "../../UpdateBoardModal"

export const BoardLandingPage = () => {
    const dispatch = useDispatch()
    const { boardId } = useParams()
    const boards = useSelector((state) => state.boardsReducer.boards)

    const user = useSelector((state) => state.session.user)
    const firstLetter = user.username[0]

    useEffect(() => {
        dispatch(getBoardDetails(boardId))

    }, [dispatch, boardId])

    let updatedBoard

    if (!boards) return null;
    if (boards) updatedBoard = boards[boardId]
    let pins;

    console.log("UPDATEDBOARDHERE", updatedBoard)



    if (updatedBoard?.pins) pins = (updatedBoard.pins)

    return (
        <div>
            <div className="profile-header">
                <div className="profile-div-left">
                    <div className="user-spot">
                        <div className="fl-div">{firstLetter}</div>
                    </div>

                    <div className="header-main">
                        <div className="board-name">{updatedBoard.name}</div>
                        <OpenModalButton buttonText={<i className="fa-solid fa-ellipsis"></i>}
                            modalComponent={<UpdateBoardModal board={updatedBoard} />} />
                        {/* <div><i className="fa-solid fa-ellipsis"></i></div> */}
                    </div>
                </div>
            </div>
            {/* <div className="user-spot">
                <div className="board-name">
                        {updatedBoard.name}
                        <


                    </div>
            </div> */}
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
        </div >
    )
}
