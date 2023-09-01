import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Fragment, useState } from 'react';
import classes from './SignUp.module.css';
import { NavLink, useHistory } from 'react-router-dom';
import useHttp from '../useHttp/useHttp';
const SignUp = () => {
    const history = useHistory();
    const [enteredEmail, setEnteredEmail] = useState('');
    const [eneteredPassword, setEnteredPassword] = useState('');
    const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');
    const [enteredName, setEnteredName] = useState('');
    const { errorPost1, sendHttpRequest: sendPostRequest1 } = useHttp();
    const { errorPost2, sendHttpRequest: sendPostRequest2 } = useHttp();

    const emailChangeHandler = async (event) => {
        setEnteredEmail(event.target.value)
    };

    const nameChangeHandler = async (event) => {
     
        setEnteredName(event.target.value);
    }

    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value)
    };

    const confirmPasswordHandler = (event) => {
        setEnteredConfirmPassword(event.target.value)
    }

   
    const saveUserName = async () => {
        const correctedEmail = enteredEmail.replace(/[^a-zA-Z0-9]/g, '');
        const body2 = {
            senderName: enteredName
        }
        await sendPostRequest2('POST', body2, `https://mailboxclient-31263-default-rtdb.firebaseio.com/${correctedEmail}username.json`)
    }
   
    const onSignupPost = (data) => {
        console.log(data)
        console.log(errorPost1)
        console.log(errorPost2)
            history.push('/login')
            saveUserName();
    }
    const submitHandler = async (event) => {
        event.preventDefault();

        if (eneteredPassword === enteredConfirmPassword) {
            const body1 = {
                email: enteredEmail,
                password: eneteredPassword,
                returnSecureToken: true
            }

            await sendPostRequest1('POST', body1, 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAaeVekfr9oPAhDg7cf3tQ5GEoC3EOff8c',onSignupPost);

        }

    };
   
    return (
        <Fragment>
            <Card className={classes.card1}>
                <h2 className={classes.heading}>Sign Up</h2>
                <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type='text' onChange={nameChangeHandler} placeholder='Enter name' required />
                    </Form.Group>
            <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type='email' onChange={emailChangeHandler} placeholder='Enter email' required/>
            </Form.Group>
            <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' onChange={passwordChangeHandler} placeholder='Password' required />
            </Form.Group>
            <Form.Group>
                    <Form.Label> Confirm Password</Form.Label>
                    <Form.Control type='password' onChange={confirmPasswordHandler} placeholder='Confirm Password' required />
                    </Form.Group>
                    {errorPost1 && <p style={{ color: 'red', fontWeight: 'bold' }}>Something went wrong! Signup failed!</p>}
                   
                    <Button type="submit" variant='danger' className={classes.signupbutton}>
                Sign Up
                    </Button>
                   
        </Form>
            </Card>
            <Card className={classes.card2 }>
                <Card.Body>
                    <Card.Text>Have an account?
                        <NavLink to='/login'>Login</NavLink>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Fragment>
    )
};
export default SignUp;