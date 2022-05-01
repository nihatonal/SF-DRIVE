import { useState, useEffect } from 'react';
import { useHttpClient } from "./http-hook";

const GetUser = (userId) => {
    const [loadedUser, setLoadedUser] = useState();
    const { sendRequest } = useHttpClient();

    useEffect(() => {   
          const fetchPlaces = async () => {
            try {
              const responseData = await sendRequest(
                `http://localhost:5000/api/users/${userId}`
              );
              setLoadedUser(responseData.user);
             
            } catch (err) {}
          };
    
          fetchPlaces();  
      }, [sendRequest, userId]);

    return loadedUser;
}

export default GetUser;
