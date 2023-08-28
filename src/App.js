import { Route, Redirect } from 'react-router-dom';
import SignUp from "./components/SignUp/SignUp";
import { Fragment, useEffect } from 'react';
import MainHeader from './components/MainHeader/MainHeader';
import Login from './components/Login/Login';
import Welcome from './components/Welcome/Welcome';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';

import {  useDispatch, useSelector } from 'react-redux';
import { Navbar } from 'react-bootstrap';
import classes from './App.module.css';
import { fetchAllMails, sentMailsList } from './store/mail-actions';
import Inbox from './components/Inbox/Inbox';
import InboxList from './components/Inbox/InboxList';
import Sent from './components/Sent/Sent';
import SentList from './components/Sent/SentList';
function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllMails());
        dispatch(sentMailsList());
    })
    const isAuth = useSelector(state=> state.auth.isAuthenticated)
    return (
        <Fragment>
            <MainHeader />
            {isAuth && <Navbar className={classes.heading}>
                <span> Mail Box</span>
                <span style={{ paddingLeft: '73rem', fontSize: '1rem' }}>{localStorage.getItem('email')}</span>
            </Navbar>}
            <div style={{ display: 'inline-flex' }}>
            {isAuth && <Welcome/>}
            <Route path='/' exact>
                {!isAuth && <Redirect to='/login'/> }
                </Route>
                <Route path='/inbox' exact>
                    <Inbox />
                </Route>
                <Route path='/inboxlist'>
                    <InboxList/>
                </Route>
                <Route path='/sent'>
                    <Sent/>
                </Route>
                <Route path='/sentlist'>
                    <SentList/>
                </Route>
            </div>
            <Route path='/signup'>
                < SignUp />
            </Route>
            <Route path='/login'>
                <Login />
            </Route>
          
            <Route path='/password'>
                <ForgotPassword />
            </Route>
        </Fragment>
        
  );
}

export default App;
