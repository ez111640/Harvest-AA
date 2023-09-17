import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useModal } from "../../../context/Modal"
import { deletePin } from "../../../store/pinsReducer"
import "./AddPinToBoardModal.css"
import { addPinToBoardThunk, getUserBoards } from "../../../store/boardsReducer"
import { useEffect, useState } from "react"


const AddPinToBoardModal = ({ pin }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const userBoards = useSelector((state) => state.boardsReducer.boards)
    const allPins = useSelector((state) => state.pinsReducer.pins)
    const allPinArr = Object.values(allPins)
    let urlParts = window.location.href.split("/")

    const newestPin = allPinArr[allPinArr.length - 1]

    const handleSubmit = (e) => {
        let boardId = document.getElementById("board-selector")
        e.preventDefault();
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

        <div className="select-board">
            <form onSubmit={handleSubmit}>
                <select id="board-selector">
                    {
                        boardArr.map((board) =>
                            <option id="board-selector-input" value={board.id}>{board.name}</option>
                        )
                    }
                </select>
                <button className="submit-button" type="submit">Save</button>
            </form>
        </div>
    )
}


export default AddPinToBoardModal;
