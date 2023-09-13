import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getBoardTopicsThunk } from "../../../../store/topicsReducer"
import { deleteBoardTopicThunk } from "../../../../store/topicsReducer"
import { useParams } from "react-router-dom"

export const IndividualTopic = ({ topic }, editBoard, boardId) => {
    const allTopics = useSelector((state) => state.topicsReducer.allTopics)
    const dispatch = useDispatch()
    let allTopArr
    if (allTopics) allTopArr = Object.values(allTopics)

    const board = useParams().boardId
    console.log("BOARD", board)
    console.log("BOARDID in IT", boardId)

    const deleteButtonClick = async (e) => {
        e.preventDefault()
        console.log("E", e.target.value)
        let topic = allTopArr.filter((topic) => topic.id == e.target.value)
        console.log("E", topic)
        const data = await dispatch(deleteBoardTopicThunk(topic[0], board))
        console.log("DATA", data)
        await dispatch(getBoardTopicsThunk(board))


    }

    useEffect(() => dispatch(getBoardTopicsThunk(boardId)), [dispatch])

    if (!allTopics) return null
    return (
        <div>
            <div className="topic-option tagged">{topic.topicName}</div>
            {editBoard && <button type="button" onClick={deleteButtonClick} value={topic.topicId} className="topic-delete-button hide-that-button" >X</button>}

        </div>
    )
}
