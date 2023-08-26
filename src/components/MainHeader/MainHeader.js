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
            <NavLink to='/signup' className={classes.link}>Sign Up</NavLink>

            {!isAuth && <NavLink to='/login' className={classes.link}>Login</NavLink>}
            {isAuth && <NavLink to='/login' className={classes.link} onClick={logoutHandler }>Logout</NavLink>}
        </Navbar>
    )

};
export default MainHeader;