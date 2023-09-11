import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getBoardPins } from "../../../../store/pinsReducer"
import { useParams } from "react-router-dom"
import { getAllComments } from "../../../../store/commentsReducer"
import { PinCard } from "../../../pins/PinCard/PinCard"
import { getBoardDetails, getUserBoards } from "../../../../store/boardsReducer"
import { NavLink, Link } from "react-router-dom"
import "./BoardLandingPage.css"
import OpenModalButton from "../../../OpenModalButton"
import UpdateBoardModal from "../../UpdateBoardModal"
import { getAllTopics, getBoardTopicsThunk } from "../../../../store/topicsReducer"
import { EditBoardTopics } from "../../EditBoardTopics/EditBoardTopics"

export const BoardLandingPage = () => {
    const dispatch = useDispatch()
    const { boardId } = useParams()
    const [showEditTopics, setShowEditTopics] = useState(false)
    const boards = useSelector((state) => state.boardsReducer.boards)
    const allTopics = useSelector((state) => state.topicsReducer.allTopics)
    const topics = useSelector((state) => state.topicsReducer.boardTopics)
    console.log("TOPICS", topics)
    const user = useSelector((state) => state.session.user)
    const firstLetter = user.username[0]


    window.onbeforeunload = function () {
        window.setTimeout(function () {
            window.location = '/boards';
        }, 0);
        window.onbeforeunload = null; // necessary to prevent infinite loop, that kills your browser
    }

    useEffect(() => {
        console.log("SENDING TO THUNK", boardId)

        dispatch(getBoardDetails(boardId))
        dispatch(getAllTopics())
        dispatch(getBoardTopicsThunk(boardId))

    }, [dispatch, boardId])

    let updatedBoard
    let boardTopics;
    let topicIds = []

    if (!boards) return null;
    if (boards) updatedBoard = boards[boardId]
    if (topics) boardTopics = Object.values(topics)
    if (boardTopics) {
        boardTopics.forEach((topic) => {
            topicIds.push(topic.id)
        })
    }
    console.log("TOPICIDS", topicIds)

    let allTopArr
    console.log("ALLTOPICS", boardTopics)
    if (allTopics) allTopArr = Object.values(allTopics)
    console.log("TOPARR", allTopArr)
    let pins;



    if (updatedBoard?.pins) pins = (updatedBoard.pins)

    return (
        <div>
            <div className="profile-header">
                <div className="profile-div-left">
                    <div className="user-spot">
                        <div className="fl-div">{firstLetter}</div>
                    </div>

                    <div className="header-main">
                        <div className="board-name">{updatedBoard.name}</div>
                        <OpenModalButton buttonText={<i className="fa-solid fa-ellipsis"></i>}
                            modalComponent={<UpdateBoardModal board={updatedBoard} />} />
                        {/* <div><i className="fa-solid fa-ellipsis"></i></div> */}
                    </div>
                </div>
            </div>
            <div className="topics-container">
                {/* {showEditTopics === false ?
                    <div className="topics-div">{boardTopics?.map((topic) => <div className="topic-option tagged">{topic.topicName}</div>)}</div> : */}
                <div >{allTopArr.length && <EditBoardTopics boardTopics={boardTopics} topicIds={topicIds} allTopArr={allTopArr} />}</div>
                {/* } */}
                {/* {
                    allTopArr ?
                        <div className="topics-div">
                            {
                                allTopArr.map((topic) => (
                                    <div >
                                        {topicIds[0] == topic.id || (topicIds.indexOf(topic.id) !== -1) ?

                                            <div className="topic-option tagged">{topic.name}</div> :
                                            <div className="topic-option untagged">{topic.name}</div>

                                        }
                                    </div>
                                ))
                            }
                        </div> :
                        <div></div>
                } */}
            </div>
            <div>
                {updatedBoard.pins ?
                    <div id="all-pins">
                        {pins[0].map((pin) => (
                            <div id={pin.pinId} className="pin-photo">
                                <NavLink to={`/pins/${pin.id}`}><img alt="pin" src={pin.pin.url}></img></NavLink>
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
