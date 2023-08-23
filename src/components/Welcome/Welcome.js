import { Fragment, useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import classes from './Welcome.module.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
const Welcome = () => {
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    const [to, setTo] = useState('');
    const [cc, setCc] = useState('');
    const [bcc, setBcc] = useState('');
    const [subject, setSubject] = useState('')
   
    const emailToAlphabets = (email) => {
        const alphabetsOnly = email.replace(/[^a-zA-Z0-9]/g, '');
        return alphabetsOnly;
    };

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
        const mailTo = {
            to: to,
            subject: subject,
            message: message
        }
        if (cc) {
            const ccMail = {
                cc: cc,
                subject: subject,
                message: message
            }
            try {
                const response = await fetch(`https://mailboxclient-31263-default-rtdb.firebaseio.com/${cc}.json`, {
                    method: 'POST',
                    body: JSON.stringify(ccMail),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if (!response.ok) {
                    const error = response.json()
                    throw new Error('Something went wrong', error)
                }
                const data = await response.json();
                console.log('successfully sent', data)

            } catch (error) {
                console.log('failed', error)
            }
        }
        if (bcc) {
            const bccMail = {
                bcc: bcc,
                subject: subject,
                message: message
            }

            try {
                const response = await fetch(`https://mailboxclient-31263-default-rtdb.firebaseio.com/${bcc}.json`, {
                    method: 'POST',
                    body: JSON.stringify(bccMail),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if (!response.ok) {
                    const error = response.json()
                    throw new Error('Something went wrong', error)
                }
                const data = await response.json();
                console.log('successfully sent', data)

            } catch (error) {
                console.log('failed', error)
            }
        }
        try {
            const response = await fetch(`https://mailboxclient-31263-default-rtdb.firebaseio.com/${to}.json`, {
                method: 'POST',
                body: JSON.stringify(mailTo),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (!response.ok) {
                const error = response.json()
                throw new Error('Something went wrong', error)
            }
            const data = await response.json();
            console.log('successfully sent', data)

        } catch (error) {
            console.log('failed', error)
        }
    };
    return (
        <Fragment>
    <h2>
    Welcome to your mailbox.
        </h2>
            <Card className={classes.composecard }>
                <Card.Body>
                    <Card.Title>New Message</Card.Title>
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

                </Card.Body>
        </Card>
        </Fragment>
    )
};
export default Welcome;