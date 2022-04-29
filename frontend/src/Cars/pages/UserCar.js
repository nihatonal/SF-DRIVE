import React from "react";
import { Link } from "react-router-dom";

import { FaArrowLeft } from "react-icons/fa";
import CarInfo from "../components/CarInfo";
import "./UserCar.css";

const UserCar = (props) => {
  return (
    <div className="usercar-container">
      <Link to="/usercars">
        <p className={"usercar-arrow"}>
          <i className={"fa"}>
            <FaArrowLeft />
          </i>
          Назад
        </p>
      </Link>

      <CarInfo
        brand={props.selectedCar.brand}
        model={props.selectedCar.model}
        year={props.selectedCar.year}
        price={props.selectedCar.price}
        price_for3={props.selectedCar.price_for3}
        price_more5={props.selectedCar.price_more5}
        mainImg={props.selectedCar.images[0]}
        secondImg={props.selectedCar.images[1]}
        thirdImg={props.selectedCar.images[2]}
        engine_volume={props.selectedCar.engine_volume}
        engine_power={props.selectedCar.engine_power}
        engine_type={props.selectedCar.engine_type}
        engine_transmission={props.selectedCar.engine_transmission}
        engine_run={props.selectedCar.engine_run}
        options={props.selectedCar.options}
      />
    </div>
  );
};

export default UserCar;
