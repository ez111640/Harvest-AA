import "./ExploreBoardCard.css"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { getBoardDetails } from "../../../store/boardsReducer"
import OpenModalButton from "../../OpenModalButton"
import DeleteBoardModal from "../../boards/DeleteBoardModal"
import UpdateBoardModal from "../../boards/UpdateBoardModal"


export const ExploreBoardCard = ({ board }) => {
    const dispatch = useDispatch()
    const boards = useSelector((state) => state.boardsReducer.boards)

    useEffect(() => {
        dispatch(getBoardDetails(board))
    }, [dispatch, board])


    return (
        <div>
            <div className="explore-photo-div">
                {boards[board.id]?.first_pin ? <Link to={`/boards/${board.id}`}><img alt="board" className="explore-board-cover-photo" src={boards[board.id].first_pin}></img></Link>
                    : <div> <Link to={`/boards/${board.id}`}><img alt="board" className="explore-board-cover-photo" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"}></img></Link> </div>
                }

            </div>
            <div className="explore-board-name">
                <div className="explore-board-inner-div">{board.name}</div>
            </div>

        </div>
    )
}
