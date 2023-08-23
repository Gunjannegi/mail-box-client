import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import classes from './MainHeader.module.css';
const MainHeader = () => {
    return (
        <Navbar className={classes.topnav}>

            <NavLink to='/signup' className={classes.link}>Sign Up</NavLink>

            <NavLink to='/login' className={classes.link}>Login</NavLink>


        </Navbar>
    )

};
export default MainHeader;