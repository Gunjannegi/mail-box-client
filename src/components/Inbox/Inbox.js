
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import classes from './Inbox.module.css';
import { deletingMails, fetchAllMails } from "../../store/mail-actions";
import DeleteIcon from '@mui/icons-material/Delete';
import { mailActions } from "../../store/mails";

const Inbox = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const mails = useSelector(state => state.mail.mails);
    const tc = useSelector(state => state.mail.totalUnreadMessage);
    const date = new Date();
    const showDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
   
    const inboxMailHandler = async(mail) => {
        const mailObjToStr = JSON.stringify(mail)
        history.push(`/inboxlist?data=${encodeURIComponent(mailObjToStr)}`)
        if (mail.status === 'unread') {
            const email = localStorage.getItem('email');
            const correctedEmail = email.replace(/[^a-zA-Z0-9]/g, '');
            
            try {
                const response = await fetch(`https://mailboxclient-31263-default-rtdb.firebaseio.com/${correctedEmail}.json`)
                    const existingMails = await response.json();
                for (const key in existingMails) {
                    if (key === mail.id) {
                            existingMails[key].status = 'read'
                        }
                }
                console.log(existingMails)
                const res = await fetch(`https://mailboxclient-31263-default-rtdb.firebaseio.com/${correctedEmail}.json`, {
                    method: 'PUT',
                    body: JSON.stringify(existingMails ),
                    header: {
                        'Content-Type': 'application/json'
                    }
                })
                if (!res.ok) {
                    const error = res.json();
                    console.log('Something went wrong', error)
                }
                const data = await res.json();
                dispatch(fetchAllMails());
                console.log('Successfully updated', data)

            } catch (error) {
                console.log('failed', error)
            }
        }
    };

    const deleteMail = (thisMail) => {
        dispatch(deletingMails(thisMail.id))
        const updatedMails = mails.filter((mail) => mail.id !== thisMail.id)
        dispatch(mailActions.fetchMails(updatedMails))
        if (tc > 0 && thisMail.status==='unread') {
            dispatch(mailActions.totalCount(Number(tc) - 1))
        }
    };
    return (
        <>
            <table className={classes.table}>

                <tbody>
                    {mails.map((mail) => (
                        <>
                        <tr onClick={() => inboxMailHandler(mail)} className={classes.row }>
                            <th scope="row">
                                <div className={mail.status === 'unread' ?  classes.column1 : ''}></div>
                                </th>
                                <td style={{ fontWeight: mail.status==='unread' ? 'bold' : ''}}>{mail.senderName}</td>
                                <td>
                                    <span style={{ fontWeight: mail.status === 'unread' ? 'bold' : '' }} > {mail.subject}</span>
                                    
                                    <div
                                        style={{ color: 'gray', width: '40rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{mail.message.blocks[0].text} </div></td>

                                <td className={classes.column4} style={{ fontWeight: mail.status === 'unread' ? 'bold' : '' }}>{mail.date === showDate ? mail.time : mail.date}</td>
                                <td className={classes.deletebutton}>
                                    <button style={{ backgroundColor: 'beige', border: 'none' }}
                                        onClick={(e) => {
                                        e.stopPropagation();
                                            deleteMail(mail)
                                        }}><DeleteIcon style={{ fontSize: '1rem' }} /></button>
                                </td>
                        </tr>
                           
                        </>
                    ))}
                </tbody>
            </table>

       
        </>
    ) 

};
export default Inbox;