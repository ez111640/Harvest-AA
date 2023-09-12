

export const LOAD_PINS = '/pinsReducer/loadPins'
export const LOAD_BOARD_PINS = '/pinsReducer/loadBoardPins'
export const ADD_PIN = "/pinsReducer/addNewPin"
export const UPDATE_PIN = "/pinsReducer/putPin"
export const DELETE_PIN = "/pinsReducer/deletePins"
export const GET_ONE_PIN = "/pinsReducer/getOnePin"

export const loadPins = (pins) => ({
    type: LOAD_PINS,
    pins
})

export const loadBoardPins = (boardPins) => ({
    type: LOAD_BOARD_PINS,
    boardPins
})

export const getOnePin = (pin) => ({
    type: GET_ONE_PIN,
    pin
})

export const addNewPin = (pin) => ({
    type: ADD_PIN,
    pin
})

export const putPin = pin => ({
    type: UPDATE_PIN,
    pin
})

export const deletePins = (pinId) => {
    return {
        type: DELETE_PIN,
        pinId
    }
}

export const getAllPins = () => async (dispatch) => {
    const res = await fetch(`/api/pins`)

    const allPins = await res.json();

    console.log("GETALLPINS", allPins)
    dispatch(loadPins(allPins.Pins))
}

export const getOnePinThunk = (pinId) => async (dispatch) => {
    const res = await fetch(`/api/pins/${pinId}`)

    const pin = await res.json()
    console.log(pin)
    if (res.ok) dispatch(getOnePin(pin))
    else {
        console.log("PROBLEM WITH RESPONSE FROM BACKEND")
    }


}

export const getBoardPins = (id) => async (dispatch) => {
    const res = await fetch(`/api/boards/${id}/pins/all`)

    const btps = await res.json();
    console.log("BTPS", btps)
    if (btps == "No pins") {
        console.log("NO PINS FOR THAT BOARD")
    } else {
        dispatch(loadBoardPins(btps))
    }

}

export const updatePinThunk = (updatedPin) => async (dispatch) => {
    console.log(updatedPin)
    const res = await fetch(`/api/pins/${updatedPin.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPin)
    })
    const oldPin = await res.json()
    if (res.ok) {
        await dispatch(putPin(updatedPin))
    } else {
        console.log("THERE WAS A PROBLEM WITH RES")
    }
}

// export const addPinThunk = (pin) => async (dispatch) => {
//     console.log("PININTHUNK", pin)
//     try {
//         const res = await fetch(`/api/pins`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(pin)
//         });


//         const pinResponse = await res.json()
//         dispatch(addNewPin(pinResponse))
//     } catch (error) {
//         const errors = await error.json();
//         return errors;
//     }
// }

export const addPinThunk = (pin) => async (dispatch) => {
    console.log("MADEITTOTHUNK", pin)
    const formData = new FormData()


    formData.append('url', pin.url)
    formData.append('description', pin.description)
    formData.append('link', pin.link)
    formData.append('title', pin.title)

    console.log("FORMDATA", formData)
    const response = await fetch(`/api/pins`, {
        method: "POST",
        body: formData
    })
    if (response.ok) {
        const newPin = await response.json();
        dispatch(addNewPin(newPin))
        return newPin
    } else {
        const errors = await response.json()
        return errors;
    }

}

export const deletePin = (pinId) => async (dispatch) => {

    console.log("PD", pinId)
    const res = await fetch(`/api/pins/${pinId}`, {
        method: 'DELETE'
    })
    console.log("RESPONSE FROM THUNK", res)
    if (res.ok) {
        //     await dispatch(deletePin(pinId))
        return null
    } else {
        const errors = await res.json()
        return errors
    }
}

const initialState = {
    pins: {},
    boardPins: {},
    pin: {}
};
export const pinsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_PINS:
            newState = { ...state, pins: { ...state.pins }, boardPins: { ...state.boardPins } }
            action.pins.forEach((pin) =>
                newState.pins[pin.id] = pin)
            return newState
        case LOAD_BOARD_PINS:
            newState = { ...state, ...action.boardPins }
            return newState;
        case GET_ONE_PIN:
            newState = { ...state, pins: { ...state.pins }, boardPins: { ...state.boardPins } }
            newState.pin = action.pin
            return newState
        case ADD_PIN:
            newState = { ...state, pins: { ...state.pins }, boardPins: { ...state.boardPins } }
            newState.pins[action.pin.id] = action.pin
            return newState
        case UPDATE_PIN:
            newState = { ...state, pins: { ...state.pins }, boardPins: { ...state.boardPins } }
            newState.pins[action.pin.id] = action.pin
            return newState
        case DELETE_PIN:
            newState = { ...state, pins: { ...state.pins }, boardPins: { ...state.boardPins } }
            delete newState.pins[action.pinId];
            newState.pins.forEach((pin) =>
                newState.pins[pin.id] = pin)
            return newState
        default:
            return state;
    }
}
