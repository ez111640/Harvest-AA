import { useDispatch } from "react-redux"
import { addCommentThunk, getAllComments } from "../../../store/commentsReducer"
import { useState } from "react"
import "./AddComment.css"

export const AddComment = ({ pinId }) => {
    const [commentText, setCommentText] = useState("")
    const dispatch = useDispatch()

    console.log("COMMENTTEXT", commentText)

    const handleSubmit = (e) => {

        e.preventDefault()
        console.log("COMMENTTEXT", commentText)
        console.log(pinId, pinId)
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
                    <button  onClick={handleSubmit} type="Submit"><i className="fa-solid fa-check"></i></button>
                </div>
            </label>
        </div>
    )
}
