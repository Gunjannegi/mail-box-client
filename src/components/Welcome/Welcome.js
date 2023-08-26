import { Fragment } from "react";
import { NavLink } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import classes from './Welcome.module.css';
import Compose from "../Compose/Compose";
import { useSelector } from "react-redux";

const Welcome = () => {
    const totalUnreadMail = useSelector(state => state.mail.totalUnreadMessage)
    return (
        <Fragment>
            <div className={classes.inline}>
                <Card className={classes.sidebar}>   
                    <ul>
                        <li className={classes.compose}>
                            <Compose/>
                        </li>
                        <li className={classes.subtitle}>
                            <NavLink to='/inbox' className={classes.inbox}>
                                <span>Inbox</span>
                                <span className={classes.unread}>{totalUnreadMail} unread</span>
                            </NavLink></li>
                        <li className={classes.subtitle}>
                            <NavLink to='/sent' className={classes.inbox}>Sent</NavLink></li>
                    </ul>
                </Card>
             
            </div>
        </Fragment>
    )
};
export default Welcome;