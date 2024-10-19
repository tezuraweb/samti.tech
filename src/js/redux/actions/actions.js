export const updateFormData = (data) => ({
    type: 'UPDATE_FORM_DATA',
    payload: data,
});

export const resetFormData = () => ({
    type: 'RESET_FORM_DATA',
});

export const setLanguage = (language) => ({
    type: 'SET_LANGUAGE',
    payload: language,
});

export const setCurrency = (currency) => ({
    type: 'SET_CURRENCY',
    payload: currency,
});