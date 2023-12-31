import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useModal } from "../../../context/Modal"
import { deletePin } from "../../../store/pinsReducer"
import "./AddPinToBoardModal.css"
import { addPinToBoardThunk, getUserBoards } from "../../../store/boardsReducer"
import { useEffect, useState } from "react"
import OpenModalButton from "../../OpenModalButton"


const AddPinToBoardModal = ({ pin }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const userBoards = useSelector((state) => state.boardsReducer.boards)
    const allPins = useSelector((state) => state.pinsReducer.pins)
    const user = useSelector((state) => state.session.user)
    const allPinArr = Object.values(allPins)
    const [page, setPage] = useState(1)
    let urlParts = window.location.href.split("/")

    const newestPin = allPinArr[allPinArr.length - 1]

    const handleSubmit = (e) => {
        let boardId = document.getElementById("board-selector")
        e.preventDefault();
        dispatch(addPinToBoardThunk(boardId.value, pin))
        history.push(`/boards/${boardId.value}`)
        setPage(2)
    }

    const handleSuccess = (e) => {
        e.preventDefault()
        closeModal()
    }
    useEffect(() => {
        dispatch(getUserBoards())
    }, [dispatch])

    if (!userBoards) return null;

    const boardArr = Object.values(userBoards)
    const filteredArr = boardArr.filter((board) => board.userId === user.id)
    if (!boardArr) return null;
    return (
        <div>
            {page === 1 &&
                <div className="select-board">
                    {filteredArr.length ?
                        <form onSubmit={handleSubmit}>

                            <select id="board-selector" data-mdb-option-height= "100">

                                {
                                    filteredArr.map((board) =>

                                        <option className="board-selector-option" value={board.id}>{board.name}</option>
                                    )
                                }

                            </select>

                            <button className="submit-button" type="submit">Save</button>
                        </form>
                        :
                        <div className="create-board-prompt">Create a board to save this pin!</div>
                    }
                </div>}
            {
                page === 2 &&
                <div className="display-success" onClick={handleSuccess}>
                    {/* <div className="close-success">X</div> */}
                    <div>Pinned!</div>
                </div>
            }
        </div>
    )
}


export default AddPinToBoardModal;
