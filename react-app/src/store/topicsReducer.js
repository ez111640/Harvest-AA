export const LOAD_TOPICS = "/topicsReducer/loadTopics"
export const ADD_NEW_BOARD_TOPIC = "/topicsReducer/addNewBoardTopic"

export const loadTopics = (topics) => ({
    type: LOAD_TOPICS,
    topics
})

export const addNewBoardTopic = (topic) => ({
    type: ADD_NEW_BOARD_TOPIC,
    topic
})

export const getAllTopics = () => async (dispatch) => {
    const res = await fetch(`/api/topics`)

    const allTopics = await res.json();
    console.log("ALLTOPICS", allTopics)
    dispatch(loadTopics(allTopics.Topics))
}

export const addNewBoardTopicThunk = (topic, board) => async (dispatch) => {
    const res = await fetch(`/api/boards/${board.id}/topics`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(topic)
        })
    const topicResponse = await res.json()
    dispatch(addNewBoardTopicThunk(topicResponse))

}


const initialState = {}

export const topicsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_TOPICS:
            newState = { ...state, topics: { ...state.topics } }
            action.topics.forEach((topic) => {
                newState.topics[topic.id] = topic
            })
            return newState
        default:
            return state;
    }
}
