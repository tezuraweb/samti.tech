const initialState = {
    currentLang: null,
};

const languageReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LANGUAGE':
            return {
                ...state,
                currentLang: action.payload,
            };
        default:
            return state;
    }
};

export default languageReducer;