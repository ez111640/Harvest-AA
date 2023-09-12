import { useDispatch } from "react-redux"
import { Redirect, useHistory } from "react-router-dom"

import { useModal } from "../../../context/Modal"
import { deletePin, getAllPins } from "../../../store/pinsReducer"
import "./deletePinModal.css"

const DeletePinModal = ({ pinId, lastPage }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(deletePin(pinId))
        dispatch(getAllPins())
        history.push("/")
        window.location.reload();
        closeModal()


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


export default DeletePinModal;
