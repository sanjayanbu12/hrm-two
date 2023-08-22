import { applyMiddleware, createStore } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk'; // Import Redux Thunk
import { persistStore,persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
// ==============================|| REDUX - MAIN STORE ||============================== //

// const store = createStore(reducer);
// const persister = 'Free';
const persistConfig = {
    key:'root',
    storage,
}
const persistedReducer=persistReducer(persistConfig,reducer );
export const store = createStore(persistedReducer,applyMiddleware(thunk));
export const persistor=persistStore(store)
// export { store, persister };

