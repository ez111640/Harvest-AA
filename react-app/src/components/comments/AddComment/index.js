import "./AddComment.css"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addCommentThunk, getAllComments } from "../../../store/commentsReducer"


export const AddComment = ({ pinId }) => {
    const [commentText, setCommentText] = useState("")
    const [error, setError] = useState("")
    const dispatch = useDispatch()

    const handleSubmit = (e) => {

        e.preventDefault()
        let comment = { commentText, pinId }
        dispatch(addCommentThunk(comment))
        dispatch(getAllComments())

    }



    return (
        <div>
            <label className='comment-text-field'>
                <div className="enter-comment">
                    <input
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Leave a comment"
                        required
                    />
                    {commentText.length && commentText.length <=100 ? <button onClick={handleSubmit} type="Submit"><i className="check-all-comments fa-solid fa-check"></i></button> : <div></div>}
                </div>
                    	<span className="float-right">{commentText ? commentText.length <= 100 ? 100 - commentText.length : <span className="error">Your comment must be 100 characters or less</span> : 100}</span>
            </label>
        </div>
    )
}
