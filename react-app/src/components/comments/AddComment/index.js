import { useDispatch } from "react-redux"
import { addCommentThunk } from "../../../store/commentsReducer"
import { useState } from "react"

export const AddComment = ({ pinId }) => {
    const [commentText, setCommentText] = useState("")
    const dispatch = useDispatch()


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("COMMENTTEXT", commentText)
        console.log(pinId, pinId)
        let comment = { commentText, pinId }
        dispatch(addCommentThunk(comment))

    }

    return (
        <div><form onSubmit={handleSubmit}>
            <label className='comment-text-field'>
                <input
                    type="textarea"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    required
                />
            </label>
            <button type="Submit">Submit</button>
        </form></div>
    )
}
