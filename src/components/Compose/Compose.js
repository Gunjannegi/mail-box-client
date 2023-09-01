import { Fragment, useEffect, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import classes from './Compose.module.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { sentMailsList } from '../../store/mail-actions';
import { useDispatch } from 'react-redux';
import useHttp from '../useHttp/useHttp';
import draftToHtml from 'draftjs-to-html';




const Compose = () => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [showErrorNotification, setShowErrorNotification] = useState(false);
    const [showSuccessNotification, setShowSuccessNotification] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('')
    const [senderName, setSenderName] = useState('');
   
    const email = localStorage.getItem('email');
    const correctedEmail = email.replace(/[^a-zA-Z0-9]/g, '');
    const { errorGet, sendHttpRequest: sendGetRequest } = useHttp()
    const { errorPost1, sendHttpRequest: sendPostRequest1 } = useHttp()
    const { errorPost2, sendHttpRequest: sendPostRequest2 } = useHttp()

    console.log(errorGet, errorPost2)
   
    const emailToAlphabets = (email) => {
        const alphabetsOnly = email.replace(/[^a-zA-Z0-9]/g, '');
        return alphabetsOnly;
    };
    const onGettingName = (data) => {

        if (data && senderName === '') {
            for (const key in data) {
                setSenderName(data[key].senderName);
            }
        }
    }

    const fetchSendername = async () => {
        await sendGetRequest('GET', '', `https://mailboxclient-31263-default-rtdb.firebaseio.com/${correctedEmail}username.json`,onGettingName)
    }
    useEffect(() => {
        if (senderName==='')
            fetchSendername();
    }, [senderName])
  
        const onPostingMails = () => {
                setShowSuccessNotification(true);
                setTimeout(() => {
                    setShowSuccessNotification(false)
                    setEditorState('')
                    setSubject('')

                }, 2000)

            }
            if (errorPost1) {
                setShowErrorNotification(true);
                setTimeout(() => {
                    setShowErrorNotification(false)
                    setEditorState('')
                    setSubject('')

                }, 2000)
        }
    const onSentMails = () => {
        dispatch(sentMailsList())
    }
    const toRecipientHandler = (event) => {
        const convertedTo = emailToAlphabets(event.target.value);
        setTo(convertedTo)
    }
    const subjectHandler = (event) => {
        setSubject(event.target.value);
    };
    const editorStateChangeHandler = (newEditorState) => {
        setEditorState(newEditorState);
    }
    const submitHandler = async (event) => {
        event.preventDefault();
        const message = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        console.log(message);
        const date = new Date();
        const showTime = date.toLocaleString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
        const showDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

        const mailTo = {
            senderName: senderName,
            to: to,
            from: email,
            subject: subject,
            message: message,
            date: showDate,
            time: showTime,
            status: 'unread'
        }

        await sendPostRequest1('POST', mailTo, `https://mailboxclient-31263-default-rtdb.firebaseio.com/${to}.json`,onPostingMails)
        await sendPostRequest2('POST', mailTo, `https://mailboxclient-31263-default-rtdb.firebaseio.com/sentBy${correctedEmail}.json`,onSentMails)
    }
     
    return (
        <Fragment>
            <Button variant='danger' className={classes.composebutton} onClick={handleShow}>Compose</Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                {showSuccessNotification && < Modal.Header style={{ color: 'green', fontWeight: 'bold' }}> Successfully sent the message!</Modal.Header>}
                {errorPost1 && showErrorNotification && < Modal.Header style={{ color: 'red', fontWeight: 'bold' }}> Failed To Send!</Modal.Header>}
                <Modal.Header closeButton>
                    <Modal.Title>New Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={submitHandler}>
                        <Form.Group>
                            <Form.Label>To</Form.Label>
                            <Form.Control type='email' onChange={toRecipientHandler} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Cc</Form.Label>
                            <Form.Control type='email' />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Bcc</Form.Label>
                            <Form.Control type='email' />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='text' placeholder='Subject' onChange={subjectHandler} value={subject} required />
                        </Form.Group>
                        <Editor
                            editorState={editorState}
                            onEditorStateChange={editorStateChangeHandler}
                            wrapperClassName={classes.wrapperclass}
                            editorClassName={classes.editorclass}
                            toolbarClassName={classes.toolbarclass}
                            required />
                       
                        <Button type='submit'>Send</Button>
                    </Form>

                </Modal.Body>
            </Modal>
        </Fragment>
    )
};
export default Compose;