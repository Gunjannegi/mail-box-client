import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Fragment, useState } from 'react';
import classes from './Login.module.css';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import useHttp from '../useHttp/useHttp';
const Login = () => {
    const { errorMessage, sendHttpRequest: sendPostRequest } = useHttp();
    const history = useHistory();
    const dispatch = useDispatch();
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [login, setLogin] = useState(false);

  
    const onPostMails = (data) => {
            dispatch(authActions.login(data.idToken));
            localStorage.setItem("email", enteredEmail);
            localStorage.setItem("token", data.idToken);
        setLogin(true);
        console.log(errorMessage)
    }

    const emailChangeHandler = (event) => {
        setEnteredEmail(event.target.value)
    };

    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value)
    };
   
    const submitHandler = async (event) => {
        event.preventDefault();
       
        if (!login) {
            const body = {
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true
            }

            await sendPostRequest('POST', body, `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAaeVekfr9oPAhDg7cf3tQ5GEoC3EOff8c`,onPostMails)
        }
    }
 

    const goToWelcomePage = () => {
        history.push('/inbox')
    }
    if (login) {
        goToWelcomePage();
    }

    return(
        <Fragment>
        <Card className={classes.card1}>
            <h2 className={classes.heading}>Login</h2>
                <Form onSubmit={ submitHandler}>
                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type='email' onChange={emailChangeHandler} placeholder='Enter email' required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' onChange={passwordChangeHandler} placeholder='Password' required />
                        </Form.Group>
                <Button type="submit" variant='danger' className={classes.loginbutton}>
                    Login
                    </Button>
                    {errorMessage && <p style={{ color: 'red', fontWeight: 'bold' }}>Something Went Wrong! Unable to Login.</p>}
                    <NavLink to='/password' >Forgot password?</NavLink>
            </Form>
        </Card>
        <Card className={classes.card2}>
            <Card.Body>
                    <Card.Text>Don't have an account?
                        < NavLink to='/signup'>Sign Up</NavLink>
                    </Card.Text>
            </Card.Body>
        </Card>
    </Fragment>
    )
};
export default Login;