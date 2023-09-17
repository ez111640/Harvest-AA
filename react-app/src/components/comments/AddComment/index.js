import "./AddComment.css"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addCommentThunk, getAllComments } from "../../../store/commentsReducer"

export const AddComment = ({ pinId }) => {
    const [commentText, setCommentText] = useState("")
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
                        required
                    />
                    <button  onClick={handleSubmit} type="Submit"><i className="check-all-comments fa-solid fa-check"></i></button>
                </div>
            </label>
        </div>
    )
}
