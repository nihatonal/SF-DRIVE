import React, { useState, useEffect, useContext } from "react";

import Button from "../../shared/Components/FormElements/Button";
import CarList from "../components/CarList";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Mycar from "../../assets/images/mycar.png";
import UserCar from "./UserCar";

import "./UserCars.css";

const UserCars = (props) => {
  const auth = useContext(AuthContext);
  const [loadedCars, setLoadedCars] = useState();
  const [selectedCar, setSelectedCar] = useState();
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


  const modalHandler = (e) => {
    e.stopPropagation();
    setSelectedCar(loadedCars.filter((car) => car.id === e.target.id));
    console.log(loadedCars.filter((car) => car.id === e.target.id));
  };


  return (
    <React.Fragment>
      <div
        className="mycar-container"
        style={loadedCars && { marginTop: "150px" }}
      >
        {isLoading && (
          <div className="loading-wrapper">
            <i className="fa fa-circle-o-notch fa-spin"></i>
          </div>
        )}

        {!isLoading && loadedCars && (
          <CarList cars={loadedCars} onClick={modalHandler} />
        )}

        {!isLoading && !loadedCars && (
          <div className="mycar-content">
            <img src={Mycar} alt="mycar" />
            <h2 className="mycar-content-title">
              Зарабатывайте на своём автомобиле
            </h2>
            <h2 className="mycar-content-title-mobile">
              Зарабатывайте <br></br> на своём автомобиле
            </h2>
            <p className="mycar-content-subtitle">
              Сдавайте автомобиль в аренду и получайте заработок.
            </p>
          </div>
        )}

       { selectedCar && <UserCar selectedCar={selectedCar[0]} />}


        <div className="btn-add-car-wrapper">
          <Button to="/usercars/addcar" inverse className="btn-add-car">
            Добавить автомобиль
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserCars;
