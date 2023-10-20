import "./BoardLandingPage.css"
import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, NavLink, useHistory } from "react-router-dom"
import { getAllPins, getBoardPins } from "../../../../store/pinsReducer"
import { updateBoardThunk, getUserBoards } from "../../../../store/boardsReducer"
import { deleteBoardTopicThunk, getAllTopics, getBoardTopicsThunk } from "../../../../store/topicsReducer"
import { PageHeader } from "../../../auth/User/PageHeader"
import { BoardTopicModal } from "./BoardTopicModal"
import OpenModalButton from "../../../OpenModalButton"
import UpdateBoardModal2 from "../../UpdateBoardModal2"
import RemovePinFromBoard from "../../../pins/RemovePinFromBoard"

export const BoardLandingPage = () => {
    const dispatch = useDispatch()
    const { boardId } = useParams()
    const [showEditTopics, setShowEditTopics] = useState(false)
    const [name, setName] = useState("");
    const [errors, setErrors] = useState([]);

    const boards = useSelector((state) => state.boardsReducer.boards)
    const allTopics = useSelector((state) => state.topicsReducer.allTopics)
    const topics = useSelector((state) => state.topicsReducer.boardTopics)
    const pins = useSelector((state) => state.pinsReducer.boardPins)
    const allPins = useSelector((state) => state.pinsReducer.pins)
    const user = useSelector((state) => state.session.user)
    const history = useHistory()
    let firstLetter
    if (user) firstLetter = user.username[0].toUpperCase()
    if (!user) history.push("/")

    const thisBoard = Object.values(boards).find((board) => board.id == boardId)

    useEffect(() => {

        // dispatch(getBoardDetails(boardId))

        dispatch(getUserBoards())
        dispatch(getAllTopics())
        dispatch(getBoardTopicsThunk(boardId))
        dispatch(getAllPins())
        dispatch(getBoardPins(boardId))

    }, [dispatch, boardId])

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     let newBoard = {}
    //     name ? newBoard.name = name : newBoard.name = thisBoard.name
    //     newBoard.id = thisBoard.id
    //     const data = await dispatch(updateBoardThunk(newBoard));
    //     await dispatch(getUserBoards())
    //     if (data) {
    //         setErrors(data);
    //     } else {
    //         setEditBoard(false)
    //     }
    // };
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();


    const openMenu = () => {
        dispatch(getUserBoards())
        if (showMenu) return;
        setShowMenu(true);
    };

    const ulClassName = "select-edit-board-type-dropdown" + (showMenu ? "" : " hidden");

    useEffect(() => {

        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [dispatch, showMenu]);

    const [editBoard, setEditBoard] = useState(false)
    const [editBoardName, setEditBoardName] = useState(false)

    if (!thisBoard) return null

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newBoard = {}
        name ? newBoard.name = name : newBoard.name = thisBoard.name
        newBoard.public = thisBoard.public
        newBoard.id = thisBoard.id
        const data = await dispatch(updateBoardThunk(newBoard));
        await dispatch(getUserBoards())
        setEditBoardName(!editBoardName)
        if (data) {
            setErrors(data);
        }
    };



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

    const clickEditBoardName = (e) => {
        e.preventDefault()
        setEditBoardName(!editBoardName)
    }

    const deleteButtonClick = async (e) => {
        e.preventDefault()
        let topic = allTopArr.filter((topic) => topic.id == e.target.value)

        const data = dispatch(deleteBoardTopicThunk(topic[0], boardId))

        dispatch(getBoardTopicsThunk(boardId))

    }



    if (!boards) return null
    if (!boardTopics) return null
    if (!allTopics) return null
    if (!topics) return null
    if (!pins) return null
    if (!allPins) return null
    if (!thisBoard) return null;
    return (
        <div>
            {thisBoard.userId === user.id ? <PageHeader /> : <div className="bump-down"></div>}

            <div className="f-edit-board-name-input">
                {editBoardName ?
                    <div className="f-edit-board-modal">
                        <form onSubmit={handleSubmit}>
                            <div className="f-board-name">
                                <div className='f-edit-board-name-field'>
                                    Board Name:
                                </div>
                                <div className="f-input-new-board-name">
                                    <input
                                        type="text"
                                        value={name && name}
                                        placeholder={name ? name : thisBoard.name}
                                        className="f-board-input"
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                    <div className={name.length > 50
                                        ? "f-show-error-create-name error"
                                        : "f-show-error-create-name no-error"}>
                                        {name.length <= 50
                                            ? 50 - name.length
                                            : "Oops! Board names must be 50 characters or less"}
                                    </div>
                                </div>
                            </div>
                            {name.length > 0 &&
                                <button
                                    className="submit-button f-change-size"
                                    type="submit">
                                    Save
                                </button>}
                        </form>
                    </div>
                    :
                    <div className="board-name">{thisBoard.name}</div>}
                <div className="update-board-button">

                    <button
                        className="select-edit-board-button"
                        onClick={openMenu}>
                        <i className="fa-solid fa-ellipsis"></i>
                    </button>
                    <ul
                        className={ulClassName}
                        ref={ulRef}>
                        <div className="edit-bn-lp">
                            <button onClick={clickEditBoardName}>Edit Board Name</button>
                            <button onClick={clickEditBoardButton}>Edit Pins</button>
                            <OpenModalButton
                                buttonText="Edit Topics"
                                modalComponent={<BoardTopicModal board={thisBoard} />}
                            />
                        </div>

                    </ul>
                    {/* <SelectEditBoardOption /> */}
                </div>
            </div>
            <div>
                {thisBoardPins.length ?
                    <div id="all-pins">
                        {thisBoardPins.map((pin) => (
                            <div
                                id={pin.id}
                                className="pin-photo">
                                {editBoard &&
                                <div className="edit-board-delete-pin">
                                    <OpenModalButton
                                    buttonText="X"
                                    modalComponent={<RemovePinFromBoard
                                    pinId={pin.id}
                                    lastPage={`/boards/`}
                                    boardId={boardId} />} />
                                </div>}
                                <NavLink to={`/pins/${pin.id}`}>
                                    <img alt="pin" src={pin.url}></img>
                                    </NavLink>
                            </div>
                        ))}
                    </div>
                    :
                    <div className="new-user-no-boards">This board is empty. Start browsing and save the ideas you like! Click home to get started.</div>
                }
            </div>
        </div >
    )
}
