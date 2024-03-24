const initialState = {
    coordinates: {
        lat: 0,
        lon: 0
    }
}

const mainReducer = (state = initialState, action) => {

    switch (action.type) {

        case "CITY_COORDINATES":
            return {
                ...state,
                coordinates: action.payload
            };

        default: return state
    }
}
export default mainReducer