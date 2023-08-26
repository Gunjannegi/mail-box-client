import { useLocation } from 'react-router-dom';
const InboxList = () => {
 
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const mailObjToStr = queryParams.get('data');
    
    const data = JSON.parse(decodeURIComponent(mailObjToStr));
   console.log(data)
    return (
        <div>
            <h1>Inbox List</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
};
export default InboxList;