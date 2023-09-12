import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllPins, getBoardPins } from "../../../../store/pinsReducer"
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
    const pins = useSelector((state) => state.pinsReducer.boardPins)
    const allPins = useSelector((state) => state.pinsReducer.pins)
    console.log("TOPICS", topics)
    const user = useSelector((state) => state.session.user)
    const firstLetter = user.username[0]

    let this_board_pinIds
    let allPinArray = []
    if (pins) this_board_pinIds = Object.values(pins)[0]
    if (allPins) allPinArray = Object.values(allPins)

    let thisBoardPins = []

    if (this_board_pinIds && allPinArray) {
        for (let i = 0; i < this_board_pinIds.length; i++) {
            console.log(this_board_pinIds[i])
            for (let j = 0; j < allPinArray.length; j++) {
                console.log((allPinArray[j]))
                if (this_board_pinIds[i] === allPinArray[j].id) {
                    thisBoardPins.push(allPinArray[j])
                }
            }
        }
    }


    window.onbeforeunload = function () {
        window.setTimeout(function () {
            window.location = '/boards';
        }, 0);
        window.onbeforeunload = null; // necessary to prevent infinite loop, that kills your browser
    }

    useEffect(() => {

        // dispatch(getBoardDetails(boardId))
        dispatch(getAllTopics())
        dispatch(getBoardTopicsThunk(boardId))
        dispatch(getBoardPins(boardId))

    }, [dispatch, boardId])


    let boardTopics;
    let topicIds = []

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





    return (
        <div>
            <div className="profile-header">
                <div className="profile-div-left">
                    <div className="user-spot">
                        <div className="fl-div">{firstLetter}</div>
                    </div>

                    <div className="header-main">
                        {/* <div className="board-name">{updatedBoard.name}</div> */}
                        {/* <OpenModalButton buttonText={<i className="fa-solid fa-ellipsis"></i>}
                            modalComponent={<UpdateBoardModal board={updatedBoard} />} /> */}
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
