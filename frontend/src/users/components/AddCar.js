import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../shared/Components/FormElements/Input";
import Button from "../../shared/Components/FormElements/Button";
import SendError from "../../SignUpPage/components/SendError";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_PHONE,
  VALIDATOR_CODE,
  VALIDATOR_PASSWORD,
  VALIDATOR_PASSWORD_CONFIRM,
} from "../../shared/util/validators";

import { useForm } from "../../shared/hooks/SignUpFrom-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useWindowDimensions } from "../../shared/hooks/useWindowDimensions";
import { SignUpContext } from "../../shared/context/signup-context";
import { AuthContext } from "../../shared/context/auth-context";
import eye from "../../assets/icons/eye.svg";
import eye_active from "../../assets/icons/eye_active.svg";

import "./AddCar.css";

const AddCar = () => {
  const navigate = useNavigate();
  const SignUp = useContext(SignUpContext);
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
      engine_power_kw: {
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
    },
    false
  );

  const signupFormHandler = async (e) => {
    e.preventDefault();
    console.log(formState.inputs);
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
      <form className="form__container" onSubmit={signupFormHandler}>
        <div className={"form__container-head"}>
          <p className={"form__container-head-subtitle"}>Шаг 1 из 4</p>
          <h1 className={"form__container-head-title"}>Новый автомобиль</h1>
        </div>

        <div className="form-content info-car">
          <h2>Информация об автомобиле</h2>
          <Input
            id="brand"
            element="input"
            type="text"
            label="Марка"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            placeholderclassName="input-hidden"
          />
          <Input
            id="model"
            element="input"
            type="text"
            label="Модель"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            placeholderclassName="input-hidden"
          />
          <Input
            id="year"
            element="input"
            type="number"
            label="Год выпуска"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            placeholder="0000"
            placeholderclassName="input-hidden"
            className="input-short"
          />
          <Input
            id="plate_number"
            element="input"
            type="text"
            label="Гос. номер"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            placeholder="А000АА000"
            placeholderclassName="input-hidden"
            className="input-short"
          />
          <Input
            id="vin_number"
            element="input"
            type="text"
            label="VIN"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            placeholder="ABCD1234567890"
            placeholderclassName="input-hidden"
          />
          <Input
            id="color"
            element="input"
            type="text"
            label="Цвет"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            placeholderclassName="input-hidden"
            classNameWrapper="classNameWrapper"
          />
          <Input
            id="engine_type"
            element="input"
            type="text"
            label="Тип двигателя"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            placeholderclassName="input-hidden"
          />
          <Input
            id="engine_volume"
            element="input"
            type="text"
            label="Объем"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            placeholder="1,0 л"
            placeholderclassName="input-hidden"
            className="input-short"
          />
          <div className="engine_power">
            <span>Мощность</span>
            <Input
              id="engine_power"
              element="input"
              type="text"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
              placeholder="100 л.с."
              placeholderclassName="input-hidden"
              errorTextclassName="input-hidden"
              className="input-power"
            />
            <Input
              id="engine_power_kw"
              element="input"
              type="text"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
              placeholder="73,5499 кВт"
              placeholderclassName="input-hidden"
              className="input-power"
            />
          </div>
          <Input
            id="engine_transmission"
            element="input"
            type="text"
            label="Трансмиссия"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            placeholderclassName="input-hidden"
            classNameWrapper="classNameWrapper"
          />
          <Input
            id="engine_run"
            element="input"
            type="text"
            label="Пробег"
            validators={[VALIDATOR_REQUIRE()]}
            placeholder="10 000 км"
            onInput={inputHandler}
            placeholderclassName="input-hidden"
            className="input-short"
          />
          <Input
            id="pts"
            element="input"
            type="text"
            label="Серия и номер ПТС"
            validators={[VALIDATOR_REQUIRE()]}
            placeholder="00 АА 000000"
            onInput={inputHandler}
            placeholderclassName="input-hidden"
          />
          <Input
            id="sts"
            element="input"
            type="text"
            label="Серия и номер СТС"
            validators={[VALIDATOR_REQUIRE()]}
            placeholder="00 АА 000000"
            onInput={inputHandler}
            placeholderclassName="input-hidden"
          />
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

export default AddCar;
