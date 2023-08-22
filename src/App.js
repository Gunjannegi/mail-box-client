import { Route } from 'react-router-dom';
import SignUp from "./components/SignUp/SignUp";
import { Fragment } from 'react';
import MainHeader from './components/MainHeader/MainHeader';
import Login from './components/Login/Login';
import Welcome from './components/Welcome/Welcome';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';

function App() {
    return (
        <Fragment>
            <MainHeader/>
        <Route path='/signup'>
            <SignUp/>
        </Route>
            <Route path='/login'>
                <Login />
            </Route>
            <Route path='/welcome'>
                <Welcome/>
            </Route>
            <Route path='/password'>
                <ForgotPassword/>
            </Route>
        </Fragment>
        
  );
}

export default App;
