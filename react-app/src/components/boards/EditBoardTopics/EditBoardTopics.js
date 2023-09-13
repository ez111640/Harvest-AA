import { useEffect, useState } from "react"
import { getBoardTopicsThunk } from "../../../store/topicsReducer"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
export const EditBoardTopics = (topicInfo) => {

    const { boardTopic, topicIds, allTopArr } = topicInfo
    const [showEditTopics, setShowEditTopics] = useState(false)
    const { boardId } = useParams()
    const boardTopics = useSelector((state) => state.topicsReducer.boardTopics)
    const boardTopicArr = Object.values(boardTopics)
    console.log("TOPICIDSHERE", boardTopicArr)

    const onClick = (e) => {
        e.preventDefault()
        setShowEditTopics(!showEditTopics)
    }

    useEffect(() => {
        getBoardTopicsThunk(boardId)
    })
    if (!boardTopics) return null
    return (
        <div>
                <div>
                    {boardTopicArr && boardTopicArr.map((topic) => {
                        <div>Or not</div>
                    })}
                </div>

        </div>
    )
}
