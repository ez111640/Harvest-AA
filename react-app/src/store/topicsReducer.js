import { bindActionCreators } from "redux"

export const LOAD_TOPICS = "/topicsReducer/loadTopics"
export const ADD_NEW_BOARD_TOPIC = "/topicsReducer/addNewBoardTopic"
export const GET_BOARD_TOPICS = "/topicsReducer/getBoardTopics"

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

export const getAllTopics = () => async (dispatch) => {
    const res = await fetch(`/api/topics`)

    const allTopics = await res.json();
    dispatch(loadTopics(allTopics.Topics))
}



export const addNewBoardTopicThunk = (topic, boardId) => async (dispatch) => {
    console.log("TOPIC THUNK")
    const res = await fetch(`/api/boards/${boardId}/topics`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(topic)
        })
    const topicResponse = await res.json()
    dispatch(addNewBoardTopic(topicResponse))

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

}

export const getBoardTopicsThunk = (boardId) => async (dispatch) => {
    console.log("BOARDID", boardId)
    const res = await fetch(`/api/boards/${boardId}/topics`)
    if (res.ok) {
        let topics = await res.json()
        console.log("========TOPICS", topics)
        dispatch(getBoardTopics(topics.Board_Topics))
    } else {
        console.log("Something went wrong in the thunk")
    }

}


const initialState = {
    boardTopics: {},
    allTopics: {}
}

export const topicsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_TOPICS:
            newState = { ...state, allTopics: { ...state.allTopics } }
            action.topics.forEach((topic) => {
                newState.allTopics[topic.id] = topic
            })
            return newState
        case GET_BOARD_TOPICS:
            newState = { ...state, boardTopics: {} }
            action.topics.forEach((topic) => (
                newState.boardTopics[topic.id] = topic
            ))
            return newState;
        default:
            return state;
    }
}
