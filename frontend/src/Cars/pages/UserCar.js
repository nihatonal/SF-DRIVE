import React from "react";
import { Link } from 'react-router-dom';

import { FaArrowLeft } from "react-icons/fa";
import CarInfo from "../components/CarInfo";
import "./UserCar.css";

const UserCar = () => {


  return (
    <div className="usercar-container">
      <Link to="/user/usercars">
        <p className={"usercar-arrow"}>
          <i className={"fa"}>
            <FaArrowLeft />
          </i>
          Назад{" "}
        </p>
      </Link>

      <CarInfo />
    </div>
  );
};

export default UserCar;
