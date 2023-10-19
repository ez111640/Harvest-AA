import "./BoardCard.css"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { getBoardDetails } from "../../../../store/boardsReducer"
import OpenModalButton from "../../../OpenModalButton"
import DeleteBoardModal from "../../DeleteBoardModal"
import UpdateBoardModal from "../../UpdateBoardModal"



export const BoardCard = ({ board }) => {
    const dispatch = useDispatch()
    const boards = useSelector((state) => state.boardsReducer.boards)
    const [boardButtons, setBoardButtons] = useState(false)

    useEffect(() => {
        dispatch(getBoardDetails(board))
    }, [dispatch, board])

    const showBoardButtons = () => {
        setBoardButtons(!boardButtons)
    }


    return (
        <div>
            <div className="board-cover-photo-div">
                {boards[board.id]?.first_pin ? <Link to={`/boards/${board.id}`}><img alt="board" className="board-cover-photo" src={boards[board.id].first_pin}></img></Link>
                    : <div> <Link to={`/boards/${board.id}`}><img alt="board" className="board-cover-photo" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"}></img></Link> </div>
                }<div className="board-sub-one">{board.name}<i onClick={showBoardButtons} className="fa-solid fa-pen-to-square shrink-edit-symbol"></i></div>
                {boardButtons ? <div className="board-sub-two ">
                    <OpenModalButton
                        buttonText="Update"
                        modalComponent={<UpdateBoardModal board={board} />}
                    />
                    <OpenModalButton className="edit-delete-buttons"
                        buttonText="Delete"
                        modalComponent={<DeleteBoardModal boardId={board.id} />}
                    />
                </div> : <div></div>}
            </div>

        </div>
    )
}
