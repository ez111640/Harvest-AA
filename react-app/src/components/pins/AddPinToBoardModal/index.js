import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useModal } from "../../../context/Modal"
import { deletePin } from "../../../store/pinsReducer"
import "./deletePinModal.css"
import { addPinToBoardThunk, getUserBoards } from "../../../store/boardsReducer"
import { useEffect, useState } from "react"


const AddPinToBoardModal = ({ pin }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const userBoards = useSelector((state) => state.boardsReducer.boards)

    const handleSubmit = (e) => {
        let boardId = document.getElementById("board-selector")
        console.log("ISTHISIT", boardId.value)
        e.preventDefault();
        console.log("NTHSIDF", pin.id)
        dispatch(addPinToBoardThunk(boardId.value, pin))
        history.push("/")
        closeModal();
    }
    useEffect(() => {
        dispatch(getUserBoards())
    }, [dispatch])

    if (!userBoards) return null;

    const boardArr = Object.values(userBoards)
    if (!boardArr) return null;
    return (

        <div className="confirm-delete">
            <form onSubmit={handleSubmit}>
                <select id="board-selector">
                    {
                        boardArr.map((board) =>
                            <option value={board.id}>{board.name}</option>
                        )
                    }
                </select>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}


export default AddPinToBoardModal;
