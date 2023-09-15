import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import "./BoardCard.css"
import { Link } from 'react-router-dom'
import OpenModalButton from "../../../OpenModalButton"
import DeleteBoardModal from "../../DeleteBoardModal"
import UpdateBoardModal from "../../UpdateBoardModal"
import { getBoardDetails } from "../../../../store/boardsReducer"

export const BoardCard = ({ board }) => {
    const dispatch = useDispatch()


    const boards = useSelector((state) => state.boardsReducer.boards)
    const detailedBoard = useSelector((state) => state.boardsReducer.board)

    useEffect(() => {
        dispatch(getBoardDetails(board))
    }, [dispatch, board])


    console.log("BOARDS", boards[board.id].first_pin)
    console.log("detailedBoard", detailedBoard.first_pin)


    return (
        <div>
            <div className="board-cover-photo-div">
            {boards[board.id]?.first_pin ? <Link to={`/boards/${board.id}`}><img alt="board" className="board-cover-photo" src={boards[board.id].first_pin}></img></Link>
                    : <div> <Link to={`/boards/${board.id}`}><img alt="board" className="board-cover-photo" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"}></img></Link> </div>
                }<div className="board-sub-one">{board.name}<i className="fa-solid fa-pen-to-square shrink-edit-symbol"></i></div>
                <div className="board-sub-two ">
                    <OpenModalButton
                        buttonText="Update"
                        modalComponent={<UpdateBoardModal board={board} />}
                    />
                    <OpenModalButton className="edit-delete-buttons"
                        buttonText="Delete"
                        modalComponent={<DeleteBoardModal boardId={board.id} />}
                    />
                </div>
            </div>

        </div>
    )
}
