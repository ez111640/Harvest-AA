import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addNewBoardTopicThunk, deleteBoardTopicThunk, getAllTopics, getBoardTopicsThunk } from "../../../../store/topicsReducer"
import "./BoardLandingPage.css"
import { useModal } from "../../../../context/Modal"

export const BoardTopicModal = (board) => {
    const topics = useSelector((state) => state.topicsReducer.allTopics)
    const boardTopics = useSelector((state) => state.topicsReducer.boardTopics)
    const dispatch = useDispatch()
    const allTopics = Object.values(topics)
    const boardArr = Object.values(boardTopics)
    let noMatch = []
    let match = []
    const { closeModal } = useModal;

    for (let i = 0; i < allTopics.length; i++) {
        for (let j = 0; j < boardArr.length; j++) {

            if (boardArr[j].topicId !== allTopics[i].id) {
                noMatch.push(allTopics[i].id)
            } else {
                match.push(allTopics[i].id)
            }
        }
    }

    const toggleMatch = async (topic) => {
        let index = match.indexOf(topic.id)
        if (index === -1) {
            let newIndex = noMatch.indexOf(topic.id)
            noMatch = noMatch.slice(0, newIndex).concat(noMatch.slice(newIndex + 1))
            match.push(topic.id)

            await dispatch(addNewBoardTopicThunk(topic, board.board.id))
            await dispatch(getBoardTopicsThunk(board.board.id))
        } else {
            match = match.slice(0, index).concat(match.slice(index + 1))
            noMatch.push(topic.id)
            await dispatch(deleteBoardTopicThunk(topic, board.board.id))
            await dispatch(getBoardTopicsThunk(board.board.id))
        }
    }



    const checkTopic = (topicId) => {

        if (match.includes(topicId)) return "match"
        else return "noMatch"
    }

    const handleClick = (e) => {
        e.preventDefault();
        closeModal();
    }


    useEffect(() => {
        dispatch(getAllTopics())
        dispatch(getBoardTopicsThunk(board.board.id))
    }, [dispatch])



    if (!topics) return null
    if (!boardArr) return null
    return (
        <div>
            <form onSubmit={() => handleClick}>
                <div className="edit-topic-title">Edit Topics</div>
                <div className="topic-div">
                    {
                        allTopics.map((topic) => (
                            <div id={topic.id} onClick={() => toggleMatch(topic)} className={"topic-list " + checkTopic(topic.id)}>{topic.name}</div>
                        ))
                    }

                </div>
                <button className="submit-button-topic" type="submit">Save</button>
            </form>
        </div>
    )
}
