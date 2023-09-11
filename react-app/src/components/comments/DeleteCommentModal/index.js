import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useModal } from "../../../context/Modal"
import { deleteCommentThunk, getAllComments } from "../../../store/commentsReducer"
import "./DeleteCommentModal.css"
import { useEffect } from "react"

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

    useEffect(() => {
        dispatch(getAllComments())
    }, [dispatch])

    const commentArr = Object.values(allComments)
    const thisComment = commentArr.find((comment) => comment.id === commentId)

    return (

        <div className="confirm-delete">
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this pin? This action cannot be undone</p>
            <button className="yes-delete-button" onClick={onSubmit} type="submit">Yes (Delete Pin)</button>
            <button className="no-delete-button">No (Keep Pin)</button>
        </div>
    )
}


export default DeleteCommentModal;
