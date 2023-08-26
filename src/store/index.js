import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import mailReducer from './mails';
const store = configureStore({
    reducer: {
        auth: authReducer,
        mail: mailReducer
    }
})
export default store;