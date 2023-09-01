import { NavLink, useHistory } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { Fragment, useState } from 'react';
import classes from './ForgotPassword.module.css';
import useHttp from '../useHttp/useHttp';
const ForgotPassword = () => {
    const history = useHistory();
    const { errorPost, sendHttpRequest: sendPostRequest } = useHttp();
    const [email, setEmail] = useState('');
    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    };
  
    const onSendingLink = (data) => {
        history.push('./login')
    }
    
    const linkHandler = async () => {
        if (email) {
            const body = {
                requestType: 'PASSWORD_RESET',
                email: email
            }
            sendPostRequest('POST', body, 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAaeVekfr9oPAhDg7cf3tQ5GEoC3EOff8c',onSendingLink)
           
        } else {
            alert('Please enter your email.')
        }
        
    }
  
    return (
        <Fragment>
        <Card className={classes.passwordcard}>
            <div>
                <p className={classes.heading}>Enter the email with which you have registered.</p>
                <input className={classes.emailinput} type='email' placeholder='Email' onChange={emailChangeHandler} value={email} required></input>
                <div>
                    <button onClick={linkHandler} className={classes.passbutton}>Send Link</button>
                </div>
                <div className={classes.asklink}>
                Already a user?
                <NavLink to='/login'>Login</NavLink>
            </div>
            </div>
        </Card>
            <div>
               
                {errorPost && <p style={{ color: 'red', fontWeight: 'bold' }}>Request failed!</p>}
            </div>
        </Fragment>
    )

};
export default ForgotPassword;