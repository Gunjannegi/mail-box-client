
import { createSlice } from '@reduxjs/toolkit';

let initialAuthState = {
    token: '',
    isAuthenticated: false
}
let tokenFromLocalStorage = localStorage.getItem('token')
if (tokenFromLocalStorage) {
    initialAuthState = {
        token: localStorage.getItem('token'),
        isAuthenticated: true
    }
};

const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            state.token = action.payload;
            state.isAuthenticated = true;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.token = null;

        }
    }
})

export const authActions = authSlice.actions;

export default authSlice.reducer;