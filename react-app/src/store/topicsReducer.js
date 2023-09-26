export const LOAD_TOPICS = "/topicsReducer/loadTopics"
export const ADD_NEW_BOARD_TOPIC = "/topicsReducer/addNewBoardTopic"
export const GET_BOARD_TOPICS = "/topicsReducer/getBoardTopics"
export const DELETE_BOARD_TOPIC = "/topicsReducer/deleteBoardTopic"

export const loadTopics = (topics) => ({
    type: LOAD_TOPICS,
    topics
})

export const addNewBoardTopic = (topic) => ({
    type: ADD_NEW_BOARD_TOPIC,
    topic
})

export const getBoardTopics = (topics) => ({
    type: GET_BOARD_TOPICS,
    topics
})

export const deleteBoardTopic = (topicId) => ({
    type: GET_BOARD_TOPICS,
    topicId
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
    console.log("POSTING")
    const res = await fetch(`/api/boards/${boardId}/topics`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(topic)
        })
    const response = await res.json()
    if (response.ok) {
        await dispatch(addNewBoardTopic(response))

        return null
    }
    else {
        const errors = res
        return errors;
    }

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
    if (response.ok) {
        await dispatch(deleteBoardTopic(topic.id))
        return null

    }
}

export const getBoardTopicsThunk = (boardId) => async (dispatch) => {

    const res = await fetch(`/api/boards/${boardId}/topics`)
    let topics = await res.json()
    await dispatch(getBoardTopics(topics.Board_Topics))
    return null
}


const initialState = {
    boardTopics: {},
    allTopics: {}
}

export const topicsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_TOPICS:
            newState = { ...state, allTopics: { ...state.allTopics }, boardTopics: { ...state.boardTopics } }
            action.topics.forEach((topic) => {
                newState.allTopics[topic.id] = topic
            })
            return newState
        case GET_BOARD_TOPICS:
            newState = { ...state, boardTopics: {}, allTopics: { ...state.allTopics } }
            action.topics.forEach((topic) => (
                newState.boardTopics[topic.id] = topic
            ))
            return newState;
        case ADD_NEW_BOARD_TOPIC:
            newState = { ...state, boardTopics: { ...state.boardTopics }, allTopics: { ...state.allTopics } }
            newState.boardTopics[action.topicId] = action.topic
            return newState;
        case DELETE_BOARD_TOPIC:
            newState = { ...state, allTopics: { ...state.allTopics }, boardTopics: { ...state.boardTopics } }
            delete newState.boardTopics[action.topicId]
            return newState;
        default:
            return state;
    }
}
