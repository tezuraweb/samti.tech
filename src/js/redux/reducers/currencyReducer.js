const initialState = {
    currentCurrency: 'dollar',
};

const currencyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CURRENCY':
            return {
                ...state,
                currentCurrency: action.payload,
            };
        default:
            return state;
    }
};

export default currencyReducer;