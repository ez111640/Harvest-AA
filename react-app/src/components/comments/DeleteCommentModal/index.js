import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { useModal } from "../../../context/Modal"
import { deleteCommentThunk } from "../../../store/commentsReducer"
import "./DeleteCommentModal.css"

const DeleteCommentModal = ({ commentId }) => {
    const allComments = useSelector((state) => state.commentsReducer)
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();



    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(deleteCommentThunk(commentId))
        closeModal()
    }


    const commentArr = Object.values(allComments)
    return (

        <div className="confirm-delete-comment">
            <p>Are you sure you want to remove this comment?</p>
            <button className="yes-delete-button-comment" onClick={onSubmit} type="submit">Yes (Delete Comment)</button>
            <button className="no-delete-button-comment">No (Keep Comment)</button>
        </div>
    )
}


export default DeleteCommentModal;
