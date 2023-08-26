import { mailActions } from "./mails";

export const fetchAllMails = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const email = localStorage.getItem('email');
            const correctedEmail = email.replace(/[^a-zA-Z0-9]/g, '');
            const response = await fetch(`https://mailboxclient-31263-default-rtdb.firebaseio.com/${correctedEmail}.json`)
            if (!response.ok) {
                throw new Error('Could not fetch data!')
            }
            const data = await response.json();
            return data;
        }
        try {
            const allMails = await fetchData();
            const allMailsList = [];
            let totalCount = 0;
            for (const key in allMails) {
                allMailsList.push({ ...allMails[key], id: key })
                if (allMails[key].status === 'unread') {
                    totalCount = totalCount + 1;
                }
            }
            
            dispatch(mailActions.fetchMails(allMailsList));
            dispatch(mailActions.totalCount(totalCount));
        } catch (error) {
            console.error('failed', error.message);
        }
    }
}