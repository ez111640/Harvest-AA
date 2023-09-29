import { useDispatch } from "react-redux"
import { Redirect, useHistory } from "react-router-dom"

import { useModal } from "../../../context/Modal"
import { deletePin, getAllPins, getBoardPins } from "../../../store/pinsReducer"
import "./deletePinModal.css"

const DeletePinModal = ({ pinId, lastPage, boardId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(deletePin(pinId))
        dispatch(getAllPins())
        if (boardId) dispatch(getBoardPins(boardId))
        closeModal()
        history.push("/boards")
        window.location.reload();

    }

    return (

        <div className="confirm-delete">
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this pin? This action cannot be undone</p>
            <button className="yes-delete-button" onClick={onSubmit} type="submit">Yes (Delete Pin)</button>
            <button className="no-delete-button" onClick={closeModal}>No (Keep Pin)</button>
        </div>
    )
}


export default DeletePinModal;
