import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ExploreBoardCard } from "./ExploreBoardCard"
import { getAllBoardsThunk, getUserBoards } from "../../../store/boardsReducer"

import "./ExploreBoardCard.css"
import { getAllTopics, getTopicBoardsThunk } from "../../../store/topicsReducer"


export const ExploreBoards = () => {
    const user = useSelector((state) => state.session.user)
    const boards = useSelector((state) => state.boardsReducer)
    const topics = useSelector((state) => state.topicsReducer.allTopics)
    const topArr = Object.values(topics)
    const boardArr = Object.values(boards.boards)

    const topicBoards = useSelector((state) => state.topicsReducer.topicBoards)
    const dispatch = useDispatch()

    const userBoards = boardArr.filter((board) => board.userId === user.id)

    console.log("topicb", topicBoards)

    const returnBoardArr = (topicId) => {
        let arr = topicBoards[topicId]
        if (arr?.length) return boardArr.filter((board) => board.public !== "false" && arr.includes(board.id))
    }

    useEffect(() => {
        dispatch(getAllBoardsThunk())
        dispatch(getAllTopics())
        for (let i = 0; i < topArr.length; i++) {
            dispatch(getTopicBoardsThunk(topArr[i].id))
        }
    }, [dispatch])




    if (!topics) return null
    if (!boards) return null
    if (!topArr) return null
    if (!boardArr) return null
    return (

        <div className="explore-div">
            {
                topArr?.map((topic) => (
                    <div >
                        <div className="topic-name">{topic.name}</div>
                        <div className="explore-boards">
                            {
                                    returnBoardArr(topic.id)?.map((board) => (
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
