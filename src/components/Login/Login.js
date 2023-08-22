import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Fragment, useState } from 'react';
import classes from './Login.module.css';
import { NavLink, useHistory } from 'react-router-dom';
const Login = () => {
    const history = useHistory()
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [login, setLogin] = useState(false);
    const emailChangeHandler = (event) => {
        setEnteredEmail(event.target.value)
    };

    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value)
    };

    const submitHandler = async (event) => {
        event.preventDefault();
       
        if (!login) {
            try {
                const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAaeVekfr9oPAhDg7cf3tQ5GEoC3EOff8c', {
                    method: 'POST',
                    body: JSON.stringify({
                        email: enteredEmail,
                        password: enteredPassword,
                        returnSecureToken: true
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }

                })
                if (!response.ok) {
                    const errorData = response.json();
                    alert('Please fill correct credentials.')
                    throw new Error(errorData.message || 'Something went wrong!')

                }
                const data = await response.json();
                console.log('successfully loggedIn', data)
                
                
                localStorage.setItem('email', enteredEmail)
                localStorage.setItem('token', data.idToken)
                setLogin(true);

            } catch (error) {
                console.error('login failed', error.message)
            }
        }
    }

   const goToWelcomePage = () => {
        history.push('/welcome')
    }
    if (login) {
        goToWelcomePage();
    }

    return(
    <Fragment>
        <Card className={classes.card1}>
            <h2 className={classes.heading}>Login</h2>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type='email' onChange={emailChangeHandler} placeholder='Enter email' required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' onChange={passwordChangeHandler} placeholder='Password' required />
                        </Form.Group>
                <Button type="submit" className={classes.loginbutton}>
                    Login
                    </Button>
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