import { NavLink } from 'react-router-dom';
import { useState } from 'react';
const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    };
    const linkHandler = async () => {
        if (email) {
            try {
                const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAaeVekfr9oPAhDg7cf3tQ5GEoC3EOff8c', {
                    method: 'POST',
                    body: JSON.stringify({
                        requestType: 'PASSWORD_RESET',
                        email: email
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }); if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error('Something went wrong', errorData)
                }
                const data = await response.json();
                if (!data) {
                    return (<p>Loading...</p>)
                } else {
                    console.log('request sent successfully', data)
                    setEmail('')
                }
            } catch (error) {
                console.log('Request failed', error.message)
            }
        } else {
            alert('Please enter your email.')
        }
    }
    return (
        <div >
            <p>Enter the email with which you have registered.</p>
            <input type='email' placeholder='Email'  onChange={emailChangeHandler} value={email} required></input>
            <div>
                <button onClick={linkHandler}>Send Link</button>
            </div>
            <div>
                Already a user?

                <NavLink to='/login'>Login</NavLink>

            </div>
        </div>
    )

};
export default ForgotPassword;