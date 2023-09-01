import { useLocation } from 'react-router-dom';
import classes from './SentList.module.css'
import {Card } from 'react-bootstrap'
import { useState } from 'react';
const SentList = () => {
    const [showInfo, setShowInfo] = useState(false);

    const toggleInfo = () => {
        setShowInfo(!showInfo);
    };

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const mailObjToStr = queryParams.get('data');

    const data = JSON.parse(decodeURIComponent(mailObjToStr));
   
    return (
        <Card className={classes.card1}>
            <div style={{ fontSize: '3rem', paddingBottom: '2rem' }}>{data.subject}</div>

            <div style={{ fontSize: '1.5rem' }}>{data.senderName}</div>
            <div className={classes.dropdowninfobox}>to me:<button className={classes.dropdowntoggle} onClick={toggleInfo}>info</button></div>


            <div className={classes.card2}>
                <div dangerouslySetInnerHTML={{ __html: data.message }}></div>
            </div>
            {showInfo && (
                <div className={classes.infocontent}>
                    <p>from: {data.senderName} {data.from}</p>
                    <p>to: {data.to}</p>
                    <p>subject: {data.subject}</p>
                    <p>date: {data.date}</p>

                </div>
            )}
        </Card>
    )
};
export default SentList;