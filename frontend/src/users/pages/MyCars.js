import React, { useState, useEffect, useContext } from "react";

import Button from "../../shared/Components/FormElements/Button";
import CarList from "../../Cars/components/CarList";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

import "./MyCars.css";

const MyCars = (props) => {
  const auth = useContext(AuthContext);
  const [loadedCars, setLoadedCars] = useState();
  const { isLoading, error, sendRequest } = useHttpClient();
  const userId = auth.userId;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/cars/user/${userId}`
        );
        setLoadedCars(responseData.cars);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  return (
    <React.Fragment>
      <div className="mycar-container" style={ loadedCars && { marginTop: "150px" }}>
        
        {isLoading && (
          <div className="loading-wrapper">
            <i className="fa fa-circle-o-notch fa-spin"></i>
          </div>
        )}

        <CarList cars={loadedCars} />
        <div className="btn-add-car-wrapper">
          <Button to="/user/addcar" inverse className="btn-add-car">
            Добавить автомобиль
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyCars;
