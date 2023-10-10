import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ExploreBoardCard } from "./ExploreBoardCard"
import { getAllBoardsThunk, getBoardDetails, getUserBoards } from "../../../store/boardsReducer"
import { getAllPins } from "../../../store/pinsReducer"
import "./ExploreBoardCard.css"
import { getAllTopics, getTopicBoardsThunk, getUserTopicsThunk } from "../../../store/topicsReducer"


export const ExploreBoards = () => {
    const user = useSelector((state) => state.session.user)
    const boards = useSelector((state) => state.boardsReducer)
    const topics = useSelector((state) => state.topicsReducer.userTopics)
    const topArr = Object.values(topics)
    const boardArr = Object.values(boards.boards)

    const topicBoards = useSelector((state) => state.topicsReducer.topicBoards)
    const dispatch = useDispatch()

    // const userBoards = boardArr.filter((board) => board.userId === user.id)

    const returnBoardArr = (topicId) => {
        let arr = topicBoards[topicId]
        if (arr?.length) return boardArr.filter((board) => board.public !== "false" && arr.includes(board.id))
    }

    useEffect(() => {
        dispatch(getAllBoardsThunk())
        dispatch(getAllTopics())
        dispatch(getAllPins())
        dispatch(getUserTopicsThunk())
        for (let i = 0; i < topArr.length; i++) {
            dispatch(getTopicBoardsThunk(topArr[i].topicId))
        }
        for (let i = 0; i < boardArr.length; i++) {
            dispatch(getBoardDetails(boardArr[i]))
        }
    }, [dispatch, topArr.length, boardArr.length])




    if (!topics) return null
    if (!boards) return null
    if (!topicBoards) return null
    if (!topArr.length) return null
    if (!boardArr.length) return null
    if (!returnBoardArr.length) return null
    return (

        <div className="explore-div">
            {
                topArr?.map((topic) => (
                    <div >
                        <div className="topic-name">{topic.topicName}</div>
                        <div className="explore-boards">
                            {
                                returnBoardArr(topic.topicId)?.map((board) => (
                                    <div value={board.id} className="each-board">

                                        <ExploreBoardCard board={board} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ))
                // boardArr.map(
                //     (board) => (
                //         <div value={board.id} className="each-board">
                //             <ExploreBoardCard board={board} />
                //         </div>
                //     )
                // )
            }
        </div>
    )
}
