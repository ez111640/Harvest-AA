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



    const onSubmit = async (e) => {
        e.preventDefault();
        await dispatch(deleteCommentThunk(commentId))
        dispatch(getAllComments())
        closeModal()
        // history.push()
    }


    const commentArr = Object.values(allComments)
    const thisComment = commentArr.find((comment) => comment.id === commentId)


    return (

        <div className="confirm-delete">
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this comment? This action cannot be undone</p>
            <button className="yes-delete-button" onClick={onSubmit} type="submit">Yes (Delete Comment)</button>
            <button className="no-delete-button">No (Keep Comment)</button>
        </div>
    )
}


export default DeleteCommentModal;
