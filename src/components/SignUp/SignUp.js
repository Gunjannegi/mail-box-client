import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Fragment, useState } from 'react';
import classes from './SignUp.module.css';
import { NavLink } from 'react-router-dom';
const SignUp = () => {
   
    const [enteredEmail, setEnteredEmail] = useState('');
    const [eneteredPassword, setEnteredPassword] = useState('');
    const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');

    const emailChangeHandler = (event) => {
        setEnteredEmail(event.target.value)
    };

    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value)
    };

    const confirmPasswordHandler = (event) => {
        setEnteredConfirmPassword(event.target.value)
    }

    const submitHandler = async (event) => {
        event.preventDefault();
       
        if (eneteredPassword === enteredConfirmPassword) {
            
            try {

                const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAaeVekfr9oPAhDg7cf3tQ5GEoC3EOff8c', {
                    method: 'POST',
                    body: JSON.stringify({
                        email: enteredEmail,
                        password: eneteredPassword,
                        returnSecureToken: true
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Something went wrong')
                }

                const data = await response.json();
                console.log('successfully signed up', data)
               
            } catch (error) {
                console.error('signup failed', error.message)
            }

        }
    };
    return (
        <Fragment>
            <Card className={classes.card1}>
                <h2 className={classes.heading}>Sign Up</h2>
            <Form onSubmit={submitHandler }>
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
                    <Button type="submit" className={classes.signupbutton}>
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