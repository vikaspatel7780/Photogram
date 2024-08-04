import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import tweetReducer from './tweetSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        upload: tweetReducer,
    },
});

export default store;
