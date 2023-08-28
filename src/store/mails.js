import { createSlice } from '@reduxjs/toolkit';

const initialMailState = { mails: [] , totalUnreadMessage: 0, sentMail:[]}


const mailSlice = createSlice({
    name: 'fetchMails',
    initialState: initialMailState,
    reducers: {
        fetchMails(state, action) {
            state.mails = action.payload
            
        },
        totalCount(state, action) {
            state.totalUnreadMessage = action.payload
        },
        allSentMails(state, action) {
            state.sentMail =  action.payload;
           
        }
    }
   
})


export const mailActions = mailSlice.actions;
export default mailSlice.reducer;