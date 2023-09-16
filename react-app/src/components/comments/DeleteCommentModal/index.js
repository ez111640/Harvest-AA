import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useModal } from "../../../context/Modal"
import { deleteCommentThunk, getAllComments } from "../../../store/commentsReducer"
import "./DeleteCommentModal.css"
import { useEffect } from "react"

const DeleteCommentModal = ({ commentId }) => {
    console.log("COMMENTIDINMIDAL", commentId)
    const allComments = useSelector((state) => state.commentsReducer)
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();



    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(deleteCommentThunk(commentId))
        closeModal()
        history.back();
        // history.push()
    }


    const commentArr = Object.values(allComments)
    const thisComment = commentArr.find((comment) => comment.id === commentId)

    return (

        <div className="confirm-delete-comment">
            <p>Are you sure you want to remove this comment?</p>
            <button className="yes-delete-button-comment" onClick={onSubmit} type="submit">Yes (Delete Comment)</button>
            <button className="no-delete-button-comment">No (Keep Comment)</button>
        </div>
    )
}


export default DeleteCommentModal;
