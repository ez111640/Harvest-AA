
export const LOAD_BOARDS = 'boardsReducer/loadBoards'
export const LOAD_BOARD = 'boardsReducer/loadBoard'
export const DELETE_BOARD = "boardsReducer/deleteBoards"
export const ADD_BOARD = "/boardsReducer/addNewBoard"
export const UPDATE_BOARD = "/boardsReducer/updateBoard"
export const ADD_PIN_TO_BOARD = "/boardsReducer/addPinToBoard"
export const REMOVE_PIN_FROM_BOARD = "/boardReducer/removePinFromBoard"


export const loadBoards = (boards) => ({
    type: LOAD_BOARDS,
    boards
})

export const loadBoard = (board) => ({
    type: LOAD_BOARD,
    board
})

export const deleteBoards = (boardId) => {
    return {
        type: DELETE_BOARD,
        boardId
    }
}

export const addNewBoard = (board) => ({
    type: ADD_BOARD,
    board
})

export const putBoard = (board) => ({
    type: UPDATE_BOARD,
    board
})

export const addPinToBoard = (pinId) => ({
    type: ADD_PIN_TO_BOARD,
    pinId
})

export const removePinFromBoard = (pinId) => ({
    type: REMOVE_PIN_FROM_BOARD,
    pinId
})

export const deleteBoard = (boardId) => async (dispatch) => {
    const res = await fetch(`/api/boards/${boardId}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        await dispatch(deleteBoards(boardId))
        return null
    } else {
        const errors = await res.json()
        return errors
    }
}

export const getAllBoardsThunk = () => async (dispatch) => {
    let res = await fetch(`/api/boards/all`)
    if (res.ok) {
        const allBoards = await res.json();
        console.log("ALLBOARDS", allBoards)
        await dispatch(loadBoards(allBoards))
    }
}

export const getUserBoards = () => async (dispatch) => {
    let res = await fetch(`/api/boards`)
    if (res.ok) {
        const allBoards = await res.json();
        await dispatch(loadBoards(allBoards))
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const getBoardDetails = (board) => async (dispatch) => {
    if (board.id !== undefined) {
        let res = await fetch(`/api/boards/${board.id}/pins`)
        if (res.ok) {
            const pins = await res.json()
            const pinArray = Object.values(pins)
            board.first_pin = pins.url
            await dispatch(loadBoard(board))
        } else {
            const errors = await res.json();
            return errors;
        }
    }
}

export const addBoardThunk = (paramBoard) => async (dispatch) => {
    console.log("BOARD", paramBoard)
    const board = {
        name: paramBoard.name,
        public: paramBoard.publicStatus
    }
    try {
        const res = await fetch(`/api/boards`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(board)
        });
        const boardResponse = await res.json()
        await dispatch(addNewBoard(boardResponse))
        if (res.ok) {
            return boardResponse;
        } else {
            const errors = await res.json();
            return errors;
        }
    } catch (error) {
        const errors = await error.json();
        return errors;
    }
}

export const updateBoardThunk = (updatedBoard) => async (dispatch) => {
    console.log("UPDATEDBOARD", updatedBoard)
    if(updatedBoard.public === "true") updatedBoard.public = true
    else updatedBoard.public = false
    console.log("AFTERFIX", updatedBoard)
    const res = await fetch(`/api/boards/${updatedBoard.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBoard)
    })
    const oldBoard = await res.json()
    if (res.ok) {
        await dispatch(putBoard(updatedBoard))
    } else {
        console.log("ERROR IN UPDATE BOARD THUNK")
    }
}

export const addPinToBoardThunk = (boardId, pin) => async (dispatch) => {
    const res = await fetch(`/api/boards/${boardId}/pins`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pin)
    })
    const response = await res.json()
    console.log("RESPONSE", response)
    await dispatch(addPinToBoard(response))
}

export const removePinFromBoardThunk = (boardId, pin) => async (dispatch) => {
    const res = await fetch(`/api/boards/${boardId}/pins`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pin)
    })
    const response = await res.json()

}

const initialState = {
    boards: {},
    board: {}

};
export const boardsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_BOARDS:
            let loadState = { ...state, boards: { ...state.boards }, board: { ...state.board } }
            action.boards.forEach((board) =>
                loadState.boards[board.id] = board
            )
            return loadState
        case LOAD_BOARD:
            let singleState = { ...state, boards: { ...state.boards } }
            singleState.board = action.board
            return singleState;
        case ADD_BOARD:
            let boardState = { ...state, boards: { ...state.boards } }
            boardState.boards[action.board.id] = action.board
            return boardState
        case DELETE_BOARD:
            let newState = { ...state, boards: { ...state.boards }, }
            delete newState.boards[action.boardId];
            return newState
        case UPDATE_BOARD:
            let thisState = { ...state, boards: { ...state.boards } }
            thisState.boards[action.board.id] = action.board
            return thisState

        default:
            return state;
    }
}
