import React, { useContext, useEffect, useState } from "react";
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

import Cardb from "../../assets/cardb.json";
import { useForm } from "../../shared/hooks/SignUpFrom-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useWindowDimensions } from "../../shared/hooks/useWindowDimensions";
import { SignUpContext } from "../../shared/context/signup-context";
import { AuthContext } from "../../shared/context/auth-context";

import "./AddCar.css";

const AddCar = () => {
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

  const calcHorsePower = (x) => {
    return (Number(x.split("л")[0]) / 1.36).toFixed(3);
  };

  const arrtag = [];

  const brandItems = [
    ...new Set(arrtag.concat(Cardb.map((item) => item.brand)).flat()),
  ];

  let selectedModels = Cardb.filter( (auto) => auto.brand.includes("Audi"));

  selectedModels = Cardb.filter( (auto) => auto.brand.includes(formState.inputs.brand.value));


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
      <form className="form__container-addcar" onSubmit={signupFormHandler}>
        <div className={"form__container-head"}>
          <p className={"form__container-head-subtitle"}>Шаг 1 из 4</p>
          <h1 className={"form__container-head-title"}>Новый автомобиль</h1>
        </div>

        <div className="form-content info-car">
          <h2>Информация об автомобиле</h2>
          {/* <Input
            id="brand"
            element="input"
            type="text"
            label="Марка"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            placeholderclassName="input-hidden"
            className="br-grey"
          /> */}

          <Input
            id="brand"
            element="select"
            label="Марка"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            placeholderclassName="input-hidden"
            className="br-grey"
          >
            {brandItems.map((x, y) => (
              <option key={y}>{x}</option>
            ))}
          </Input>

          <Input
            id="model"
            element="select"
            label="Модель"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            placeholderclassName="input-hidden"
            className="br-grey"
          >
            {selectedModels.map((x, y) => (
              <option key={y}>{x.model}</option>
            ))}
          </Input>
          <Input
            id="year"
            element="input"
            type="text"
            label="Год выпуска"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            placeholder="0000"
            placeholderclassName="input-hidden"
            className="input-short br-grey"
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
            className="input-short br-grey"
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
            className="br-grey"
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
            className="br-grey"
          />
          <Input
            id="engine_type"
            element="input"
            type="text"
            label="Тип двигателя"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            placeholderclassName="input-hidden"
            className="br-grey"
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
            className="input-short br-grey"
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
              className="input-power br-grey"
            />
            <p className="engine_power_kw">
              {calcHorsePower(formState.inputs.engine_power.value)}
            </p>
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
            className="br-grey"
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
            className="input-short br-grey"
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
            className="br-grey"
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
            className="br-grey"
          />
        </div>

        <div className="form-content info-rent">
          <h2>Стоимость аренды</h2>
          <Input
            id="price"
            element="input"
            type="text"
            label="Обычная цена"
            validators={[VALIDATOR_REQUIRE()]}
            placeholder="1 500 ₽/сутки"
            onInput={inputHandler}
            placeholderclassName="input-hidden"
            className="input-short br-grey"
          />
          <Input
            id="price_for3"
            element="input"
            type="text"
            label="Цена при аренде на 3 дня"
            validators={[VALIDATOR_REQUIRE()]}
            placeholder="1 400 ₽/сутки"
            onInput={inputHandler}
            placeholderclassName="input-hidden"
            className="input-short br-grey"
          />
          <Input
            id="price_more5"
            element="input"
            type="text"
            label="Цена при аренде более 5 дней"
            validators={[VALIDATOR_REQUIRE()]}
            placeholder="1 300 ₽/сутки"
            onInput={inputHandler}
            placeholderclassName="input-hidden"
            className="input-short br-grey"
          />
        </div>

        <div className="form-content info-insurance">
          <h2>Страхование</h2>
          <Input
            id="policy"
            element="input"
            type="text"
            label="Полис ОСАГО"
            validators={[VALIDATOR_REQUIRE()]}
            placeholder="XXX 000000000"
            onInput={inputHandler}
            placeholderclassName="input-hidden"
            className="br-grey"
          />
          <div className="container-insurance">
            <Input
              id="insurance"
              element="input"
              type="text"
              label="Полис КАСКО (если есть)"
              placeholder="XXX 000000000"
              onInput={inputHandler}
              validators={[VALIDATOR_REQUIRE()]}
              placeholderclassName="input-hidden"
              className="br-grey"
            />
            <Button to="./" className="buy_kasko">
              Купить КАСКО
            </Button>
          </div>
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
