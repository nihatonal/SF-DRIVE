import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { FaArrowLeft } from "react-icons/fa";
import CarInfo from "../components/CarInfo";
import Carousel from "../../shared/Components/UIElements/Carousel";
import ModalCar from "../../shared/Components/UIElements/ModalCar";
import "./UserCar.css";

const RentUserCar = () => {
  const [show, setShow] = useState(false);
  const [selectedCar, setSelectedCar] = useState();

  useEffect(() => {
    const selectedCar = JSON.parse(localStorage.getItem("selectedCar"));
    setSelectedCar(selectedCar);
  }, []);
  console.log(selectedCar);

  return (
    <div className="usercar-container">
      <Link to={"/rentacar"} className="usercar-arrow-wrapper">
        <p className={"usercar-arrow"}>
          <i className={"fa"}>
            <FaArrowLeft />
          </i>
          Назад
        </p>
      </Link>

      {selectedCar && (
        <CarInfo
          brand={selectedCar[0].brand}
          model={selectedCar[0].model}
          year={selectedCar[0].year}
          price={selectedCar[0].price}
          price_for3={selectedCar[0].price_for3}
          price_more5={selectedCar[0].price_more5}
          images={selectedCar[0].images}
          mainImg={selectedCar[0].images[0]}
          secondImg={selectedCar[0].images[1]}
          thirdImg={selectedCar[0].images[2]}
          engine_volume={selectedCar[0].engine_volume}
          engine_power={selectedCar[0].engine_power}
          engine_type={selectedCar[0].engine_type}
          engine_transmission={selectedCar[0].engine_transmission}
          engine_run={selectedCar[0].engine_run}
          options={selectedCar[0].options}
          owner={selectedCar[0].owner}
          onClick={() => setShow(true)}
        />
      )}
      {selectedCar && (
        <ModalCar show={show} CloseOnClick={() => setShow(false)}>
          <Carousel slides={selectedCar[0].images} />
        </ModalCar>
      )}
    </div>
  );
};

export default RentUserCar;
