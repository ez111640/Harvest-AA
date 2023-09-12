import { useDispatch } from "react-redux"
import { useHistory, useNavigate } from "react-router-dom/cjs/react-router-dom.min"
import { useModal } from "../../../context/Modal"
import { deletePin } from "../../../store/pinsReducer"
import "./deletePinModal.css"

const DeletePinModal = ({ pinId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("PINID in MODAL", pinId)
        dispatch(deletePin(pinId))
        closeModal()
        history.goBack()


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
