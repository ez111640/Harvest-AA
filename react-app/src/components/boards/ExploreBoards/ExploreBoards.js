import { useDispatch, useSelector } from "react-redux"
import { ExploreBoardCard } from "./ExploreBoardCard"
import { useEffect } from "react"
import { getAllBoardsThunk, getUserBoards } from "../../../store/boardsReducer"
import "./ExploreBoardCard.css"


export const ExploreBoards = () => {
    const boards = useSelector((state) => state.boardsReducer)
    console.log("BOARDS", boards)
    const boardArr = Object.values(boards.boards)
    const dispatch = useDispatch()

    console.log("BOARDS", boardArr)

    useEffect(() => {
        dispatch(getAllBoardsThunk())
    }, [dispatch])


    if (!boards) return null
    return (

        <div className="explore-boards">
            {
                boardArr.map(
                    (board) => (
                        <div value={board.id}>
                            <ExploreBoardCard board={board} />
                        </div>
                    )
                )
            }
        </div>
    )
}
