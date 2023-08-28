import { Fragment, useEffect, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import classes from './Compose.module.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { sentMailsList } from '../../store/mail-actions';
import { useDispatch } from 'react-redux';
//import { mailActions } from '../../store/mails';


const Compose = () => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    const [to, setTo] = useState('');
    const [cc, setCc] = useState('');
    const [bcc, setBcc] = useState('');
    const [subject, setSubject] = useState('')
    const [senderName, setSenderName] = useState('');
   
    const email = localStorage.getItem('email');
    const senderEmail = email.replace(/[^a-zA-Z0-9]/g, '');
   
   
    const emailToAlphabets = (email) => {
        const alphabetsOnly = email.replace(/[^a-zA-Z0-9]/g, '');
        return alphabetsOnly;
    };

    const fetchSendername = async() => {
        const email = localStorage.getItem('email');
        const correctedEmail = email.replace(/[^a-zA-Z0-9]/g, '');
        const response = await fetch(`https://mailboxclient-31263-default-rtdb.firebaseio.com/${correctedEmail}username.json`)
        if (!response.ok) {
            throw new Error('Could not fetch data!')
        }
        const data = await response.json();
        if (senderName === '') {
            for (const key in data) {
                setSenderName(data[key].senderName);
            }
        }
    }
    useEffect(() => {
        fetchSendername();
    })

    const toRecipientHandler = (event) => {
        const convertedTo = emailToAlphabets(event.target.value);
        setTo(convertedTo)
    }
    const ccRecipientHandler = (event) => {
        const convertedCc = emailToAlphabets(event.target.value);
        setCc(convertedCc);
    };
    const bccRecipientHandler = (event) => {
        const convertedBcc = emailToAlphabets(event.target.value);
        setBcc(convertedBcc)
    }
    const subjectHandler = (event) => {
        setSubject(event.target.value);
    };
    const editorStateChangeHandler = (newEditorState) => {
        setEditorState(newEditorState);
    }
    const submitHandler = async(event) => {
        event.preventDefault();
        const message = convertToRaw(editorState.getCurrentContent())
        const date = new Date();
        const showTime = date.toLocaleString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
        const showDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        const postDataToFirebase = async (endPoint, value) => {
            try {
                const response = await fetch(`https://mailboxclient-31263-default-rtdb.firebaseio.com/${endPoint}.json`, {
                    method: 'POST',
                    body: JSON.stringify(value),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if (!response.ok) {
                    const error = response.json()
                    throw new Error('Something went wrong', error)
                }
                const responseData = await response.json();
                console.log(`Data posted successfully with the name '${endPoint}':`, responseData)

            } catch (error) {
                console.log('failed', error)
            }

        }
        
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
       
        postDataToFirebase(to, mailTo)
        postDataToFirebase(`sentBy${senderEmail}`, mailTo)
        setTimeout(()=>(
            dispatch(sentMailsList())
        ),1000)
       
        if (cc) {
            const ccMail = {
                senderName: senderName,
                cc: cc,
                from: email,
                subject: subject,
                message: message,
                date: showDate,
                time: showTime,
                status: 'unread'
            }
            postDataToFirebase(cc, ccMail)
        }

            if (bcc) {
                const bccMail = {
                    senderName: senderName,
                    bcc: bcc,
                    from: email,
                    subject: subject,
                    message: message,
                    date: showDate,
                    time: showTime,
                    status: 'unread'
                }
                postDataToFirebase(bcc, bccMail)

            }
        };
    return (
        <Fragment>
            <Button variant='danger' className={classes.composebutton} onClick={handleShow}>Compose</Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
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
                            <Form.Control type='email' onChange={ccRecipientHandler} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Bcc</Form.Label>
                            <Form.Control type='email' onChange={bccRecipientHandler}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='text' placeholder='Subject' onChange={subjectHandler} required />
                        </Form.Group>
                        <Editor
                            editorState={editorState}
                            onEditorStateChange={editorStateChangeHandler}
                            wrapperClassName={classes.wrapperclass}
                            editorClassName={classes.editorclass}
                            toolbarClassName={classes.toolbarclass}
                           
                        />
                        <Button type='submit'>Send</Button>
                    </Form>

                </Modal.Body>
            </Modal>
        </Fragment>
    )
};
export default Compose;