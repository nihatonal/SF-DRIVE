import React, { useContext, useEffect, useState, useCallback } from "react";
import moment from "moment";
import "moment/locale/ru";
import Calender from "../../shared/Components/FormElements/Calender";
import OptionCity from "../components/OptionCity";
import OptionCar from "../components/OptionCar";
import { ShareContext } from "../../shared/context/share-contex";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import Button from "../../shared/Components/FormElements/Button";
import { useNavigate } from "react-router-dom";
import date_picker from "../../assets/icons/calender.svg";
import axios from "axios";

import "./RentACar.css";
const RentACar = () => {
  const auth = useContext(AuthContext);
  const share = useContext(ShareContext);
  const navigate = useNavigate();
  const { isLoading, sendRequest } = useHttpClient();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [loadedCars, setLoadedCars] = useState();
  const [loadedUser, setLoadedUser] = useState();
  const [dbCars, setDbCars] = useState();

  useEffect(() => {
    setLoading(true);
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/cars/", {
        headers: {
          Authorization: "Bearer " + auth.token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data.cars);
        setLoadedCars(res.data.cars);
        setDbCars(res.data.cars);
        setLoading(false);
      });
      if(share.city === null){
          share.city = "Москва"
      }
  }, [auth.token]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users/"
        );

        setLoadedUser(responseData.users);
      } catch (err) {}
    };
    fetchCars();
  }, [sendRequest]);

  const getUser = (x) => {
    return loadedUser.filter((user) => user.id === x);
  };

  // const getDates = useCallback(() => {
  //   setDates(share.date_ranges);
  // }, [share.date_ranges[0]]);

  // useEffect(() => {
  //   getDates();
  // }, [getDates]);

  const modalHandler = (e) => {
    e.stopPropagation();
    const selectCar = loadedCars.filter((car) => car.id === e.target.id);
    localStorage.setItem("selectedCar", JSON.stringify(selectCar));

    navigate(`/rentacar/${selectCar[0].id}`);
  };
  const showHandlers = () => {
    setShow(true);
  };
  function expandDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format("DD-MM-YYYY"));
      currentDate = moment(currentDate).add(1, "days");
    }
    return dateArray;
  }
  let checker = (src, target) => target.some((v) => src.includes(v));

  const searchHandler = (e) => {
    e.preventDefault();
    //setDates(share.date_ranges);
    let mark = expandDates(share.date_ranges[0], share.date_ranges[1]);
    // console.log(mark);
    // console.log(share.date_ranges);
    // const filtered = dbCars.filter(
    //   (item) =>
    //     !checker(item.dates, share.date_ranges) item.city === share.city
    // );
    // console.log(filtered);
    //setLoadedCars(filtered);

    let filtered = dbCars.filter(function(item) {
      return (
        !checker(item.dates, share.date_ranges) && item.city === share.city
      );
    });
    console.log(filtered);
    setLoadedCars(filtered);
  };

  return (
    <div className="usermain-container">
      <h2 className="search-title">Арендуйте автомобиль</h2>
      <form className="search-bar">
        <div className="input_container">
          <OptionCity cityClass="input_city" idCity="city" />

          <Calender
            className={"calender-fix"}
            image={date_picker}
            showHandler={showHandlers}
            close={()=>setShow(false)}
            show={show}
            onClick={()=>alert('s')}
          />

          <OptionCar idCity="car" />
        </div>

        <Button onClick={searchHandler} className="search-btn" inverse>
          Найти
        </Button>
      </form>

      <div className="recommended-cars-container">
        <h3>Рекомендуем поблизости</h3>
        {loading && (
          <div className="loading-wrapper">
            <i className="fa fa-circle-o-notch fa-spin"></i>
          </div>
        )}
        {loadedCars && (
          <div className="recommended-cars-wrapper">
            {loadedCars.map((item) => (
              <div
                className="recommended-car-item"
                key={item.id}
                onClick={modalHandler}
              >
                <div className="recommended-car-item_filter" id={item.id}></div>
                <img
                  src={process.env.REACT_APP_ASSETS_URL + `${item.images[0]}`}
                  alt="car"
                />
                <div className="recommended-car-item-content">
                  <p>{`${item.brand} ${item.model}, ${item.year}`}</p>
                  <p>{`от ${item.price} ₽/сутки`}</p>
                </div>
                {loadedUser && (
                  <img
                    className="user_photo"
                    src={
                      process.env.REACT_APP_ASSETS_URL +
                      `${getUser(item.owner)[0].image}`
                    }
                    alt="userImage"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RentACar;
