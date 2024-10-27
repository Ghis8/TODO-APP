import { configureStore } from '@reduxjs/toolkit'
import task from './slices/todoSlice'
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist';
import splitApi from './services/api';


const persistConfig = {
  key: 'root', // key for the persisted data in localStorage
  storage,     // storage mechanism, here it's localStorage
  
};

// Combine your reducers
const rootReducer = combineReducers({
    task,
    [splitApi.reducerPath]:splitApi.reducer
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(splitApi.middleware),
})

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch