const initialState = {
    cityName: "oslo"
}

const mainReducer = (state = initialState, action) => {

    switch (action.type) {

        case "CITY_NAME":
            return {
                ...state,
                cityName: action.payload
            };

        default: return state
    }
}
export default mainReducer