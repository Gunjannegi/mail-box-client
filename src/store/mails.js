import { createSlice } from '@reduxjs/toolkit';

const initialMailState = { mails: [] , totalUnreadMessage: 0}

const mailSlice = createSlice({
    name: 'fetchMails',
    initialState: initialMailState,
    reducers: {
        fetchMails(state, action) {
            state.mails = action.payload
            console.log(state.mails)
        },
        totalCount(state, action) {
            state.totalUnreadMessage = action.payload
        }
    }
   
})


export const mailActions = mailSlice.actions;
export default mailSlice.reducer;