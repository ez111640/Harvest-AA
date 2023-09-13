import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllPins, getBoardPins } from "../../../../store/pinsReducer"
import { useParams, NavLink } from "react-router-dom"
import "./BoardLandingPage.css"
import { addNewBoardTopicThunk, deleteBoardTopicThunk, getAllTopics, getBoardTopicsThunk } from "../../../../store/topicsReducer"
import EditBoardTopics from "../../EditBoardTopics"
import OpenModalButton from "../../../OpenModalButton"
import UpdateBoardModal from "../../UpdateBoardModal"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { getUserBoards } from "../../../../store/boardsReducer"
import { IndividualTopic } from "../../EditBoardTopics/IndividualTopic"


export const BoardLandingPage = () => {
    const dispatch = useDispatch()
    const { boardId } = useParams()
    const [showEditTopics, setShowEditTopics] = useState(false)
    const boards = useSelector((state) => state.boardsReducer.boards)
    const allTopics = useSelector((state) => state.topicsReducer.allTopics)
    const topics = useSelector((state) => state.topicsReducer.boardTopics)
    const pins = useSelector((state) => state.pinsReducer.boardPins)
    const allPins = useSelector((state) => state.pinsReducer.pins)
    console.log("TOPICS", boardId)
    const user = useSelector((state) => state.session.user)
    const history = useHistory()
    let firstLetter
    if (user) firstLetter = user.username[0]
    if (!user) history.push("/")
    useEffect(() => {

        // dispatch(getBoardDetails(boardId))

        dispatch(getUserBoards())
        dispatch(getAllTopics())
        dispatch(getBoardTopicsThunk(boardId))
        dispatch(getAllPins())
        dispatch(getBoardPins(boardId))

    }, [dispatch, boardId])

    const [editBoard, setEditBoard] = useState(false)

    const thisBoard = Object.values(boards).find((board) => board.id == boardId)
    console.log("THISBOARD", thisBoard)



    let this_board_pinIds
    let allPinArray = []
    if (pins) this_board_pinIds = Object.values(pins)[0]
    if (allPins) allPinArray = Object.values(allPins)

    let thisBoardPins = []

    if (this_board_pinIds && allPinArray) {
        for (let i = 0; i < this_board_pinIds.length; i++) {
            for (let j = 0; j < allPinArray.length; j++) {
                if (this_board_pinIds[i] === allPinArray[j].id) {
                    thisBoardPins.push(allPinArray[j])
                }
            }
        }
    }



    const onClick = (e) => {
        e.preventDefault()
        setShowEditTopics(!showEditTopics)
    }



    let boardTopics;
    let topicIds = []

    if (topics) boardTopics = Object.values(topics)
    if (boardTopics) {
        boardTopics.forEach((topic) => {
            topicIds.push(topic.topicId)
        })
    }

    let allTopArr
    if (allTopics) allTopArr = Object.values(allTopics)

    const clickEditBoardButton = (e) => {
        e.preventDefault()
        setEditBoard(!editBoard)
    }

    const deleteButtonClick = async (e) => {
        e.preventDefault()
        console.log("E", e.target.value)
        console.log("BOARDTOPICS", boardTopics)
        let topic = allTopArr.filter((topic) => topic.id == e.target.value)
        console.log("E", topic)
        const data = dispatch(deleteBoardTopicThunk(topic[0], boardId))
        console.log("DATA", data)
        dispatch(getBoardTopicsThunk(boardId))

    }

    if (!boards) return null
    if (!boardTopics) return null
    if (!allTopics) return null
    if (!topics) return null
    if (!pins) return null
    if (!allPins) return null
    return (
        <div>
            <div className="profile-header">
                <div className="profile-div-left">
                    <div className="user-spot">
                        <div className="fl-div">{firstLetter}</div>
                    </div>

                    <div className="header-main">
                        {!editBoard && thisBoard ? <div className="board-name">{thisBoard.name}</div> : <div>Edit board name under construction. Please test this feature <NavLink to="/boards">here</NavLink> by hovering over the board you'd like to edit</div>}
                        <button onClick={clickEditBoardButton}><i className="fa-solid fa-ellipsis"></i></button>
                        {/* <OpenModalButton buttonText={<i className="fa-solid fa-ellipsis"></i>}
                            modalComponent={<UpdateBoardModal board={thisBoard} />} /> */}
                    </div>
                </div>
            </div>
            <div className="topics-container">
                <div className="topics-div">
                    {boardTopics?.map((topic) =>
                    <div className="each-option">
                        < IndividualTopic topic={topic} editBoard={editBoard} boardId={boardId} />
                        {/* <div className="topic-option tagged">{topic.topicName}</div> */}
                        {editBoard && <button type="button" onClick={deleteButtonClick} value={topic.topicId} className="topic-delete-button hide-that-button" >X</button>}
                    </div>)}

                    {/* <OpenModalButton
                        buttonText="Add Topics"
                        modalComponent={<EditBoardTopics boardId={thisBoard.id} />}
                    /> */}
                </div>

            </div>
            <div>
                {thisBoardPins ?
                    <div id="all-pins">
                        {thisBoardPins.map((pin) => (
                            <div id={pin.id} className="pin-photo">
                                <NavLink to={`/pins/${pin.id}`}><img alt="pin" src={pin.url}></img></NavLink>
                            </div>
                        ))}
                    </div>
                    :
                    <div></div>
                }
            </div>
        </div >
    )
}
