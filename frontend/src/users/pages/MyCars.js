import React, { useState } from "react";

import Mycar from ".././../assets/images/mycar.png";
import Button from "../../shared/Components/FormElements/Button";

import AddCar from "../components/AddCar";

import "./MyCars.css";

const MyCars = (props) => {
  const [addCar, setAddCar] = useState(true);

  const AddCarHandler = (e) => {
    e.preventDefault();
    setAddCar(true);
  };
  return (
    <React.Fragment>
      {!addCar && (
        <div className="mycar-container">
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
          <Button inverse className="btn-add-car" onClick={AddCarHandler}>
            Добавить автомобиль
          </Button>
        </div>
      )}
      {addCar && <AddCar />}
    </React.Fragment>
  );
};

export default MyCars;
