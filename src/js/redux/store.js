import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import formReducer from './reducers/formReducer';
import languageReducer from './reducers/languageReducer';
import currencyReducer from './reducers/currencyReducer';

const rootReducer = combineReducers({
    form: formReducer,
    language: languageReducer,
    currency: currencyReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['form', 'language', 'currency'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);

export default store;