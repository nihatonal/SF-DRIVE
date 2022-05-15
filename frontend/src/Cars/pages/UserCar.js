import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { FaArrowLeft } from "react-icons/fa";
import CarInfo from "../components/CarInfo";
import Carousel from "../../shared/Components/UIElements/Carousel";
import Button from "../../shared/Components/FormElements/Button";
import ModalCar from "../../shared/Components/UIElements/ModalCar";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { useNavigate } from "react-router-dom";
import "./UserCar.css";

const UserCar = () => {
  const [show, setShow] = useState(false);
  const { isLoading, sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);
  const [selectedCar, setSelectedCar] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const selectedCar = JSON.parse(localStorage.getItem("selectedCar"));
    setSelectedCar(selectedCar);
  }, []);

  const confirmDeleteHandler = async () => {

    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL +`/cars/${selectedCar[0].id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
          setSelectedCar(null);
          localStorage.removeItem('selectedCar');
          navigate(`/${auth.userId}/cars`);
    } catch (err) {}
  };

  return (
    <div className="usercar-container">
      <Link to={`/${auth.userId}/cars`} className="usercar-arrow-wrapper" onClick={()=>localStorage.removeItem('selectedCar')}>
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

      <div className={"button-container"}>
        <Button className='toupdatecar' to={selectedCar && `/cars/${selectedCar[0].id}`} style={{ width: "196px" }} inverse>
          {!isLoading ? (
            "Редактировать"
          ) : (
            <i className="fa fa-circle-o-notch fa-spin"></i>
          )}
        </Button>

        <Button
          type="submit"
          className="btn-delete"
          inverse
          onClick={confirmDeleteHandler}
        >
          {!isLoading ? (
            "Удалить автомобиль"
          ) : (
            <i className="fa fa-circle-o-notch fa-spin"></i>
          )}
        </Button>
      </div>
    </div>
  );
};

export default UserCar;
