import { useLocation } from 'react-router-dom';
const SentList = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const mailObjToStr = queryParams.get('data');

    const data = JSON.parse(decodeURIComponent(mailObjToStr));
   
    return (
        <div>
            <h1>Sent List</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
};
export default SentList;