import React from "react";

import CardUserCar from "./CardUserCar";
import Mycar from "../../assets/images/mycar.png";

import "./CarList.css";

const CarList = (props) => {
  // if (!props.cars.length === undefined) {
  //   return (
  //     <div className="mycar-content">
  //       <img src={Mycar} alt="mycar" />
  //       <h2 className="mycar-content-title">
  //         Зарабатывайте на своём автомобиле
  //       </h2>
  //       <h2 className="mycar-content-title-mobile">
  //         Зарабатывайте <br></br> на своём автомобиле
  //       </h2>
  //       <p className="mycar-content-subtitle">
  //         Сдавайте автомобиль в аренду и получайте заработок.
  //       </p>
  //     </div>
  //   );
  // }

  return (
    <div className="userCars-container" >
      <h1 className="userCars-title">Мои автомобили</h1>
      {props.cars.map((car) => (
        
        <CardUserCar
          key={car.id}
          image={car.images[0]}
          brand={car.brand}
          model={car.model}
          year={car.year}
          engine_volume={car.engine_volume}
          engine_power={car.engine_power}
          engine_type={car.engine_type}
          engine_transmission={car.engine_transmission}
          price={car.price}
          id={car.id}
          onClick={props.onClick}
        />
      ))}
    </div>
  );
};

export default CarList;
