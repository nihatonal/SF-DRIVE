import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../shared/Components/FormElements/Input";
import Button from "../../shared/Components/FormElements/Button";
import SendError from "../../SignUpPage/components/SendError";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_NUMBER,
  VALIDATOR_EMAIL,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_PHONE,
  VALIDATOR_CODE,
  VALIDATOR_PASSWORD,
  VALIDATOR_PASSWORD_CONFIRM,
} from "../../shared/util/validators";

import Cardb from "../../assets/cardb.json";
import Infocars from "../../assets/infocars.json";
import { useForm } from "../../shared/hooks/SignUpFrom-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useWindowDimensions } from "../../shared/hooks/useWindowDimensions";
import { SignUpContext } from "../../shared/context/signup-context";
import { AuthContext } from "../../shared/context/auth-context";

import "./OptionOfCar.css";

const OptionOfCar = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      brand: {
        value: "",
        isValid: false,
      },
      model: {
        value: "",
        isValid: false,
      },
      year: {
        value: "",
        isValid: false,
      },
      plate_number: {
        value: "",
        isValid: false,
      },
      vin_number: {
        value: "",
        isValid: false,
      },
      color: {
        value: "",
        isValid: false,
      },
      color: {
        value: "",
        isValid: false,
      },
      engine_type: {
        value: "",
        isValid: false,
      },
      engine_volume: {
        value: "",
        isValid: false,
      },
      engine_power: {
        value: "",
        isValid: false,
      },
      engine_transmission: {
        value: "",
        isValid: false,
      },
      engine_run: {
        value: "",
        isValid: false,
      },
      pts: {
        value: "",
        isValid: false,
      },
      sts: {
        value: "",
        isValid: false,
      },
      price: {
        value: "",
        isValid: false,
      },
      price_for3: {
        value: "",
        isValid: false,
      },
      price_more5: {
        value: "",
        isValid: false,
      },
      policy: {
        value: "",
        isValid: false,
      },
      insurance: {
        value: "",
        isValid: true,
      },
    },
    false
  );

  const signupFormHandler = async (e) => {
    e.preventDefault();
    console.log(formState.inputs);
    localStorage.setItem(
      "carData",
      JSON.stringify({
        carinfo: formState.inputs,
      })
    );
    // try {
    //   const responseData = await sendRequest(
    //     "http://localhost:5000/api/users/signup",
    //     "POST",
    //     JSON.stringify({
    //       name: formState.inputs.name.value,
    //       birthdate: formState.inputs.birthdate.value,
    //       email: formState.inputs.email.value,
    //       phone: formState.inputs.phone.value,
    //       passport: formState.inputs.passport.value,
    //       passport_date: formState.inputs.passport_date.value,
    //       passport_issued: formState.inputs.passport_issued.value,
    //       passport_code: formState.inputs.passport_code.value,
    //       license: formState.inputs.license.value,
    //       license_date: formState.inputs.license_date.value,
    //       password: formState.inputs.password.value,
    //     }),
    //     {
    //       "Content-Type": "application/json",
    //     }
    //   );
    // } catch (err) {
    //   SignUp.error = err.message;
    //   console.log(SignUp.error);
    // }

    window.scrollTo({ top: 0, behavior: "smooth" });
    setPositionUp(true);
  };

  //After submit scroll butoon up

  const [positionUp, setPositionUp] = useState(false);
  const { height } = useWindowDimensions();
  const style_button = { top: height - 234, position: "absolute" };

  return (
    <>
      {error ? (
        <SendError sendError="Не удалось продолжить регистрацию. Попробуйте ещё раз" />
      ) : null}
      <form className="form__container-addcar" onSubmit={signupFormHandler}>
        <div className={"form__container-head"}>
          <p className={"form__container-head-subtitle"}>Шаг 2 из 4</p>
          <h1 className={"form__container-head-title"}>Дополнительно</h1>
        </div>

        <div className="form-content info-car">
          <h2>Информация об автомобиле</h2>
        </div>

        <div
          className={"button-container"}
          style={positionUp ? style_button : null}
        >
          <Button type="submit" inverse disabled={!formState.isValid}>
            {!isLoading ? (
              "Продолжить"
            ) : (
              <i className="fa fa-circle-o-notch fa-spin"></i>
            )}
          </Button>
        </div>
      </form>
    </>
  );
};

export default OptionOfCar;
