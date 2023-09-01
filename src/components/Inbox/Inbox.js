

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import classes from './Inbox.module.css';
import { deletingMails, fetchAllMails} from "../../store/mail-actions";
import DeleteIcon from '@mui/icons-material/Delete';
import { mailActions } from "../../store/mails";
import useHttp from "../useHttp/useHttp";

const Inbox = () => {
    const { errorGet, sendHttpRequest: sendGetRequest } = useHttp();
    const { errorPut, sendHttpRequest: sendPutRequest } = useHttp();
    const dispatch = useDispatch();
    const history = useHistory();
    const mails = useSelector(state => state.mail.mails);
    const tc = useSelector(state => state.mail.totalUnreadMessage);
    const date = new Date();
    const showDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    const email = localStorage.getItem('email');
    const correctedEmail = email.replace(/[^a-zA-Z0-9]/g, '');


    const putAllTask = (data) => {
        console.log(data)
        dispatch(fetchAllMails());
        console.log(errorPut)
    }
   
    const inboxMailHandler = async (mail) => {
        const mailObjToStr = JSON.stringify(mail)
        history.push(`/inboxlist?data=${encodeURIComponent(mailObjToStr)}`)
        if (mail.status === 'unread') {

            const getAllTask = async (data) => {
                const existingMails = data;
                for (const key in existingMails) {
                    if (key === mail.id) {
                        existingMails[key].status = 'read';
                    }
                }
                await sendPutRequest('PUT', existingMails, `https://mailboxclient-31263-default-rtdb.firebaseio.com/${correctedEmail}.json`, putAllTask);
              
            }

            await sendGetRequest('GET', null, `https://mailboxclient-31263-default-rtdb.firebaseio.com/${correctedEmail}.json`, getAllTask);
            
        }
    };

    const deleteMail = (thisMail) => {
        dispatch(deletingMails(thisMail.id))
        if (tc > 0 && thisMail.status === 'unread') {
            dispatch(mailActions.totalCount(Number(tc) - 1))
        }
    };
    console.log(errorGet)
    return (
        <>
            <table className={classes.table}>

                <tbody>
                    {mails.map((mail) => (
                        <>
                            <tr onClick={() => inboxMailHandler(mail)} className={classes.row}>
                                <th scope="row">
                                    <div className={mail.status === 'unread' ? classes.column1 : ''}></div>
                                </th>
                                <td style={{ fontWeight: mail.status === 'unread' ? 'bold' : '' }}>{mail.senderName}</td>
                                <td>
                                    <span style={{ fontWeight: mail.status === 'unread' ? 'bold' : '' }} > {mail.subject}</span>

                                    <div
                                        className={classes.modifyText} dangerouslySetInnerHTML={{ __html: mail.message }}></div></td>

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