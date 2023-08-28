import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import classes from './MainHeader.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth';

const MainHeader = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.auth.isAuthenticated)
    const logoutHandler = () => {
        dispatch(authActions.logout());
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('senderName')
    };
    return (
        <Navbar className={classes.topnav}>
            {!isAuth &&
                <div>
                <NavLink to='/signup' className={classes.link}>Sign Up</NavLink>
                <NavLink to='/login' className={classes.link}>Login</NavLink></div>}
            {isAuth &&
                <div>
                    <span className={classes.welcome}>Welcome</span>
                <NavLink to='/login' className={classes.logout} onClick={logoutHandler}>Logout</NavLink></div>}
        </Navbar>
    )

};
export default MainHeader;