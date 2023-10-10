export const LOAD_TOPICS = "/topicsReducer/loadTopics"
export const ADD_NEW_BOARD_TOPIC = "/topicsReducer/addNewBoardTopic"
export const GET_BOARD_TOPICS = "/topicsReducer/getBoardTopics"
export const DELETE_BOARD_TOPIC = "/topicsReducer/deleteBoardTopic"
export const GET_TOPIC_BOARDS = "/topicsReducer/getTopicBoards"
export const GET_USER_TOPICS = "/topicsReducer/getUserTopics"
export const ADD_NEW_USER_TOPIC = "/topicsReducer/addNewUserTopic"
export const DELETE_USER_TOPIC = "/topicsReduer/deleteUserTopic"

export const loadTopics = (topics) => ({
    type: LOAD_TOPICS,
    topics
})

export const addNewBoardTopic = (topic) => ({
    type: ADD_NEW_BOARD_TOPIC,
    topic
})

export const addUserTopic = (topic) => ({
    type: ADD_NEW_USER_TOPIC,
    topic
})

export const deleteUserTopic = (topicId) => ({
    type: DELETE_USER_TOPIC,
    topicId
})

export const getBoardTopics = (topics) => ({
    type: GET_BOARD_TOPICS,
    topics
})

export const getTopicBoards = (boardIds, topicId) => ({
    type: GET_TOPIC_BOARDS,
    boardIds, topicId
})

export const deleteBoardTopic = (topicId) => ({
    type: DELETE_BOARD_TOPIC,
    topicId
})
export const getUserTopics = (topics) => ({
    type: GET_USER_TOPICS,
    topics
})

export const getAllTopics = () => async (dispatch) => {
    const res = await fetch(`/api/topics`)

    const allTopics = await res.json();
    await dispatch(loadTopics(allTopics.Topics))
}


// export const getAllBoardTopicDataThunk = () => async (dispatch) => {
//     const res = await fetch(`/boardtopics`)
//     const response = await res.json()
//     if (response.ok)
// }



export const addNewBoardTopicThunk = (topic, boardId) => async (dispatch) => {
    const res = await fetch(`/api/boards/${boardId}/topics`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(topic)
        })
    const response = await res.json()
    // if (response.ok) {
        await dispatch(addNewBoardTopic(response))

        return null
    // }
    // else {
    //     const errors = res
    //     return errors;
    // }

}

export const deleteBoardTopicThunk = (topic, boardId) => async (dispatch) => {
    const res = await fetch(`/api/boards/${boardId}/topics`,
        {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(topic)
        }
    )
    const response = await res.json()
    // if (response.ok) {
        await dispatch(deleteBoardTopic(response.deleteId))
        return null

    // }
}

export const getBoardTopicsThunk = (boardId) => async (dispatch) => {

    const res = await fetch(`/api/boards/${boardId}/topics`)
    let topics = await res.json()
    await dispatch(getBoardTopics(topics.Board_Topics))
    return null
}

export const getTopicBoardsThunk = (topicId) => async (dispatch) => {
    const res = await fetch(`/api/topics/${topicId}/boards`)
    let topics = await res.json()
    await dispatch(getTopicBoards(topics.BoardIds, topicId))
    return null
}

export const getUserTopicsThunk = () => async (dispatch) => {
    const res = await fetch(`/api/topics/current`)
    let topics = await res.json()
    await dispatch(getUserTopics(topics.UserTopics))
    return null;
}

export const addUserFollowThunk = (topicId) => async (dispatch) => {
    const res = await fetch(`/api/topics/current`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(topicId)
        }
    )
    let response = await res.json()
    await dispatch(addUserTopic(response))
    return null
}

export const deleteUserFollowThunk = (topic, follow) => async (dispatch) => {
    const res = await fetch(`/api/topics/current`, {
        method: "DELETE",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify(topic.id)
    }
    )
    const response = await res.json()
    await dispatch(deleteUserTopic(follow.id))
    return null
}


const initialState = {
    boardTopics: {},
    allTopics: {},
    topicBoards: {},
    userTopics: {}
}

export const topicsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_TOPICS:
            newState = { ...state, allTopics: { ...state.allTopics }, boardTopics: { ...state.boardTopics }, topicBoards: { ...state.topicBoards }, userTopics: { ...state.userTopics } }
            action.topics.forEach((topic) => {
                newState.allTopics[topic.id] = topic
            })
            return newState
        case GET_BOARD_TOPICS:
            newState = { ...state, boardTopics: {}, allTopics: { ...state.allTopics }, topicBoards: { ...state.topicBoards }, userTopics: { ...state.userTopics } }
            action.topics.forEach((topic) => (
                newState.boardTopics[topic.id] = topic
            ))
            return newState;
        case GET_TOPIC_BOARDS:
            newState = { ...state, boardTopics: { ...state.boardTopics }, allTopics: { ...state.allTopics }, topicBoards: { ...state.topicBoards }, userTopics: { ...state.userTopics } }
            newState.topicBoards[action.topicId] = action.boardIds
            return newState
        case GET_USER_TOPICS:
            newState = { ...state, allTopics: { ...state.allTopics }, boardTopics: { ...state.boardTopics }, topicBoards: { ...state.topicBoards }, userTopics: { ...state.userTopics } }
            action.topics.forEach((topic) => (
                newState.userTopics[topic.id] = topic
            ))
            return newState;
        case ADD_NEW_BOARD_TOPIC:
            newState = { ...state, boardTopics: { ...state.boardTopics }, allTopics: { ...state.allTopics }, topicBoards: { ...state.topicBoards }, userTopics: { ...state.userTopics } }
            newState.boardTopics[action.topic.id] = action.topic
            return newState;
        case DELETE_USER_TOPIC:
            newState = { ...state, allTopics: { ...state.allTopics }, boardTopics: { ...state.boardTopics }, topicBoards: { ...state.topicBoards }, userTopics: { ...state.userTopics } }
            delete newState.userTopics[action.topicId]
            return newState;
        case DELETE_BOARD_TOPIC:
            newState = { ...state, allTopics: { ...state.allTopics }, boardTopics: { ...state.boardTopics }, topicBoards: { ...state.topicBoards }, userTopics: { ...state.userTopics } }
            delete newState.boardTopics[action.topicId]
            return newState;
        case ADD_NEW_USER_TOPIC:
            newState = { ...state, allTopics: { ...state.allTopics }, boardTopics: { ...state.boardTopics }, topicBoards: { ...state.topicBoards }, userTopics: { ...state.userTopics } }
            newState.userTopics[action.topic.id] = action.topic
            return newState;
        default:
            return state;
    }
}
