import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory } from "react-router-dom"

import { useModal } from "../../../context/Modal"
import { deletePin, getAllPins, getBoardPins } from "../../../store/pinsReducer"
import "./RemovePinFromBoard.css"
import { removePinFromBoardThunk } from "../../../store/boardsReducer"

const RemovePinFromBoard = ({ pinId, boardId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const allPins = useSelector((state) => state.pinsReducer.pins)
    const allPinArray = Object.values(allPins)
    const thisPin = allPinArray.find((pin) => pin.id === pinId)

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(removePinFromBoardThunk(boardId, thisPin))
        dispatch(getAllPins())
        if (boardId) dispatch(getBoardPins(boardId))
        closeModal()
        history.push(`/boards/${boardId}`)
        window.location.reload();

    }

    return (

        <div className="confirm-delete">
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this pin? This action cannot be undone</p>
            <button className="yes-delete-button" onClick={onSubmit} type="submit">Yes (Delete Pin)</button>
            <button className="no-delete-button">No (Keep Pin)</button>
        </div>
    )
}


export default RemovePinFromBoard;
