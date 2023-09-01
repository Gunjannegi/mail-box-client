import { useState } from "react";

const useHttp = () => {
    let [errorMessage, setErrorMessage] = useState(null)
   
    const sendHttpRequest = async (method, body, url, action) => {
        try {
            
            const response = await fetch(url, {
                method: method ? method : '',
                body: body ? JSON.stringify(body) : null,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error('Something went wrong', errorData)
            }
            const data = await response.json();
            action(data);
            console.log(`Successfully ${method} the data`, data)

        } catch (error) {
            setErrorMessage(error.message);
        } 
    }
 

    return (

        { errorMessage, sendHttpRequest } 
        
    )

};
export default useHttp;