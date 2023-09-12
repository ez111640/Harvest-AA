import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useModal } from "../../../context/Modal"
import { deleteBoard } from "../../../store/boardsReducer"



const DeleteBoardModal = ({ boardId }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(deleteBoard(boardId))
            .then(closeModal)
        history.push("/boards")
    }

    const onNoSubmit = (e) => {
        e.preventDefault();
        closeModal();
    }


    return (

        <div className='confirm-delete'>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this Board? This action cannot be undone.</p>
            <button onClick={onSubmit} className='yes-delete-button' type="submit">Yes (Delete Board)</button>
            <button onClick={onNoSubmit} className='no-delete-button'>No (Keep Board)</button>
        </div>
    )
}


export default DeleteBoardModal;
