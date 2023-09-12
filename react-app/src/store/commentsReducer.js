
export const LOAD_PIN_COMMENTS = "/commentsReducer/loadPinComments"
export const LOAD_ALL_COMMENTS = "/commentsReducer/loadAllComments"
export const ADD_NEW_COMMENT = "/commentsReducer/addNewComment"
export const DELETE_COMMENT = "/commentsReducer/deleteComment"

export const loadPinComments = (comments) => ({
    type: LOAD_PIN_COMMENTS,
    comments
})

export const loadAllComments = (comments) => ({
    type: LOAD_ALL_COMMENTS,
    comments
})

export const addNewComment = (comment) => ({
    type: ADD_NEW_COMMENT,
    comment
})

export const deleteComment = (commentId) => ({
    type: DELETE_COMMENT,
    commentId
})

export const getPinComments = (pinId) => async (dispatch) => {
    console.log("COMMENTS", pinId)
    let res = await fetch(`/api/pins/${pinId}/comments`)

    if (res.ok) {
        console.log("RES", res)
        const pinComments = await res.json();
        const pcArray = Object.values(pinComments)
        dispatch(loadPinComments(pcArray))
    } else {
        const errors = await res.json();
        return errors;
    }

}

export const getAllComments = () => async (dispatch) => {
    let res = await fetch(`/api/comments`)
    if (res.ok) {
        const allComments = await res.json();
        console.log("ALLCOMMENTS", allComments)
        dispatch(loadAllComments(allComments.Comments))
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const addCommentThunk = (comment) => async (dispatch) => {
    console.log("COMMENT", comment)
    try {
        const res = await fetch(`/api/pins/${comment.pinId}/comments`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(comment)
        });


        const commentResponse = await res.json()
        console.log("COMMENTRESPONSE", commentResponse)
        dispatch(addNewComment(commentResponse))
    } catch (error) {
        const errors = await error.json();
        return errors;
    }
}

export const deleteCommentThunk = (commentId) => async (dispatch) => {
    console.log("IN DELETE COMMENT THUNK", commentId)
    const res = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        console.log("RESPONSE FROM THUNK", res)
        await dispatch(deleteComment(commentId))
        return null
    } else {
        const errors = await res.json()
        return errors
    }
}

const initialState = {}
export const commentsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_PIN_COMMENTS:
            return { ...state, comments: { ...action.comments } }
        case LOAD_ALL_COMMENTS:
            let commentState = { ...state }
            action.comments.forEach((comment) =>
                commentState[comment.id] = comment
            )
            return commentState
        case ADD_NEW_COMMENT:
            let addState = { ...state, comments: { ...state.comments } }
            addState[action.comment.id - 1] = action.comment
            return addState
        case DELETE_COMMENT:
            let newState = { ...state }
            delete newState[action.commentId]
            return newState;
        default:
            return state;
    }
}
