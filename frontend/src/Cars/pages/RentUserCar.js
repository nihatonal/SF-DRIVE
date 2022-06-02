import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { FaArrowLeft } from "react-icons/fa";
import CarInfo from "../components/CarInfo";
import Button from "../../shared/Components/FormElements/Button";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import Carousel from "../../shared/Components/UIElements/Carousel";
import ModalCar from "../../shared/Components/UIElements/ModalCar";
import { useNavigate } from "react-router-dom";
//import Calendar from "../../shared/Components/FormElements/Calender"
import Calendar from "react-calendar";

import "./UserCar.css";
import "./RentUserCar.css";

const RentUserCar = () => {
  const { isLoading, sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [value, onChange] = useState(new Date());
  const [oneDate, setOneDate] = useState(new Date());
  const [selectedCar, setSelectedCar] = useState();
  const [markDates, setMarkDates] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const selectedCar = JSON.parse(localStorage.getItem("selectedCar"));
    setSelectedCar(selectedCar);
    if (selectedCar) setMarkDates(selectedCar[0].dates);
  }, []);

  function expandDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format("YYYY/MM/DD"));
      currentDate = moment(currentDate).add(1, "days");
    }
    return dateArray;
  }
  const newDates = expandDates(value[0], value[1]);

  const myArray = newDates.filter(function(el) {
    if (markDates) {
      return markDates.indexOf(el) < 0;
    }
  });

  console.log(new Intl.DateTimeFormat("en-US").format(oneDate));
  console.log(myArray);
  const confirmDeleteHandler = async () => {
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/cars/${selectedCar[0].id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      setSelectedCar(null);
      localStorage.removeItem("selectedCar");
      navigate("/rentacar");
    } catch (err) {}
  };
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <div className="usercar-container">
      <Link
        to={"/rentacar"}
        className="usercar-arrow-wrapper"
        onClick={() => localStorage.removeItem("selectedCar")}
      >
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

      <div className="available-wrapper">
        <h3 className="carinfo-content-title">Доступность</h3>

        <div className="calendar-wrapper">
          <div className="calendar-item" id="calendar-item-renter">
            <p className="title-calender">
              {capitalizeFirstLetter(moment().format("MMMM")) +
                " " +
                moment().format("YYYY")}
            </p>
            <Calendar
              showNavigation={false}
              showNeighboringMonth={false}
              selectRange={true}
              onChange={onChange}
              style={{}}
              //value={value}
              onClickDay={setOneDate}
              className="react-calendar_"
              tileClassName={({ date, view }) => {
                if (
                  markDates &&
                  markDates.find((x) => x === moment(date).format("YYYY/MM/DD"))
                ) {
                  return "disabled";
                } else if (
                  moment(date).format("YYYY/MM/DD") <
                  moment().format("YYYY/MM/DD")
                ) {
                  return "passed";
                }
              }}
              tileDisabled={({ date, view }) => {
                if (
                  markDates &&
                  markDates.find((x) => x === moment(date).format("YYYY/MM/DD"))
                ) {
                  return "disabled";
                } else if (
                  moment(date).format("YYYY/MM/DD") <
                  moment().format("YYYY/MM/DD")
                ) {
                  return "passed";
                }
              }}
            />
          </div>
          <div className="calendar-item">
            <p className="title-calender">
              {capitalizeFirstLetter(
                moment()
                  .subtract(-1, "month")
                  .format("MMMM")
              ) +
                " " +
                moment().format("YYYY")}
            </p>
            <Calendar
              showNavigation={false}
              activeStartDate={
                new Date(moment().year(), moment().month() + 2, 0)
              }
              showNeighboringMonth={false}
              className="react-calendar"
              tileClassName={({ date, view }) => {
                if (
                  markDates &&
                  markDates.find((x) => x === moment(date).format("YYYY/MM/DD"))
                ) {
                  return "highlight";
                } else if (
                  moment(date).format("YYYY/MM/DD") <
                  moment().format("YYYY/MM/DD")
                ) {
                  return "passed";
                }
              }}
            />
          </div>
        </div>
      </div>

      {selectedCar && (
        <ModalCar show={show} CloseOnClick={() => setShow(false)}>
          <Carousel slides={selectedCar[0].images} />
        </ModalCar>
      )}
      {selectedCar && selectedCar[0].owner === auth.userId && (
        <div className={"button-container"}>
          <Button type="submit" style={{ width: "196px" }} inverse>
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
      )}
    </div>
  );
};

export default RentUserCar;
