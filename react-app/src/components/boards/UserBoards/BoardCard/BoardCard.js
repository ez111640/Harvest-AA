import { useEffect } from "react"
import { getAllPins, getBoardPins } from "../../../../store/pinsReducer"
import { useDispatch, useSelector } from "react-redux"
import "./BoardCard.css"
import { getUserBoards } from "../../../../store/boardsReducer"
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
    }, [dispatch])


    let updatedBoard
    if (boards) updatedBoard = Object.values(boards).find((thisBoard) => thisBoard.id === board.id)

    if (updatedBoard.pins) console.log(updatedBoard.pins[0][0].pin.url)


    return (
        <div>
            <div className="board-cover-photo-div">
                {updatedBoard.pins ? <Link to={`/boards/${board.id}`}><img alt="board" className="board-cover-photo" src={updatedBoard.pins[0][0].pin.url}></img></Link>
                    : <div> <Link to={`/boards/${board.id}`}><img alt="board" className="board-cover-photo" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"}></img></Link> </div>
                }<div className="board-sub-one">{board.name}</div>
                <div className="board-sub-two ">
                    <OpenModalButton
                        buttonText="Update Board"
                        modalComponent={<UpdateBoardModal board={board} />}
                    />
                    <OpenModalButton className="edit-delete-buttons"
                        buttonText="Delete Board"
                        modalComponent={<DeleteBoardModal boardId={board.id} />}
                    />
                </div>
            </div>

        </div>
    )
}
