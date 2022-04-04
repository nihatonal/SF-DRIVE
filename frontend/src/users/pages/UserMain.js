import React, { useContext, useEffect, useState, useCallback } from "react";

import Calender from "../../shared/Components/FormElements/Calender";
import OptionCity from "../components/OptionCity";
import OptionCar from "../components/OptionCar";
import { useForm } from "../../shared/hooks/SignUpFrom-hook";
import { ShareContext } from "../../shared/context/share-contex";
import Button from "../../shared/Components/FormElements/Button";
import date_picker from "../../assets/icons/calender.svg";

import "./UserMain.css";
const UserMain = () => {
  const share = useContext(ShareContext);

  const [dates, setDates] = useState(share.date_ranges);
  const [formState, inputHandler, setFormData] = useForm({
    date_range: {
      value: null,
      isValid: false,
    },
  });

  const getDates = useCallback(() => {
    setDates(share.date_ranges);
  }, [share.date_ranges[0]]);

  useEffect(() => {
    getDates();
  }, [getDates]);

  const test = (e) => {
    e.preventDefault();
    setDates(share.date_ranges);
    console.log(share.date_ranges, share.car, share.city);
  };
  return (
    <div className="usermain-container">
      <h2 className="search-title">Арендуйте автомобиль</h2>
      <form className="search-bar">
        <div className="input_container">
          <OptionCity cityClass="input_city" idCity="city" />

          <Calender className={"calender-fix"} image={date_picker} />

          <OptionCar idCity="car" />
        </div>

        <Button onClick={test} className="search-btn" inverse>Найти</Button>
        
      </form>
    </div>
  );
};

export default UserMain;
