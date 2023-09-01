import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import classes from './Sent.module.css';
import { deletingSentMails } from "../../store/mail-actions";
import { mailActions } from "../../store/mails";
import { useHistory } from 'react-router-dom';
const Sent = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const sentMails = useSelector(state => state.mail.sentMail);
    const date = new Date();
    const showDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

    const deleteSentMailHandler = (id) => {
        dispatch(deletingSentMails(id))
        const updatedMails = sentMails.filter((mail) => mail.id !== id)
        dispatch(mailActions.allSentMails(updatedMails))
        

    };

    const sentMailHandler = (mail) => {
        const mailObjToStr = JSON.stringify(mail)
        history.push(`/sentlist?data=${encodeURIComponent(mailObjToStr)}`)
    };

    return (
        <>
            <table className={classes.table}>

                <tbody>
                    {sentMails.map((mail) => (
                        <>
                            <tr onClick={()=>sentMailHandler(mail) } className={classes.row}>
                                <th scope="row" >*</th>
                                <td>To: {mail.to.split('gmail')[0]}</td>
                                <td> {mail.subject}
                                    <div className={classes.modifyText} dangerouslySetInnerHTML={{ __html: mail.message }}></div> </td>

                                <td className={classes.column4}>{mail.date === showDate ? mail.time : mail.date}</td>
                                <td className={classes.deletebutton}>
                                    <button style={{ backgroundColor: 'beige', border: 'none' }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteSentMailHandler(mail.id)
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
export default Sent;