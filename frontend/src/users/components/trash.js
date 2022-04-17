
useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("carData"));
    if (storedData) {
      setCarInfo(storedData);
      //console.log(storedData.carinfo)

      setFormData(
        {
          brand: {
            value: storedData.brand.value,
            isValid: true,
          },
          model: {
            value: storedData.model.value,
            isValid: true,
          },
          year: {
            value: storedData.year.value,
            isValid: true,
          },
          plate_number: {
            value: storedData.plate_number.value,
            isValid: true,
          },
          vin_number: {
            value: storedData.vin_number.value,
            isValid: true,
          },
          color: {
            value: storedData.color.value,
            isValid: true,
          },
          engine_type: {
            value: storedData.engine_type.value,
            isValid: true,
          },
          engine_volume: {
            value: storedData.engine_volume.value,
            isValid: true,
          },
          engine_power: {
            value: storedData.engine_power.value,
            isValid: true,
          },
          engine_transmission: {
            value: storedData.engine_transmission.value,
            isValid: true,
          },
          engine_run: {
            value: storedData.engine_run.value,
            isValid: true,
          },
          pts: {
            value: storedData.pts.value,
            isValid: true,
          },
          sts: {
            value: storedData.sts.value,
            isValid: true,
          },
          price: {
            value: storedData.price.value,
            isValid: true,
          },
          price_for3: {
            value: storedData.price_for3.value,
            isValid: true,
          },
          price_more5: {
            value: storedData.price_more5.value,
            isValid: true,
          },
          policy: {
            value: storedData.policy.value,
            isValid: true,
          },
          insurance: {
            value: storedData.insurance.value,
            isValid: true,
          },
        },
        false
      );
    }
    
  }, [setFormData]);


  import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../shared/Components/FormElements/Input";
import Button from "../../shared/Components/FormElements/Button";
import SendError from "../../SignUpPage/components/SendError";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_NUMBER,
  VALIDATOR_MAXLENGTH,
} from "../../shared/util/validators";

import Cardb from "../../assets/cardb.json";
import Infocars from "../../assets/infocars.json";
import { useForm } from "../../shared/hooks/SignUpFrom-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useWindowDimensions } from "../../shared/hooks/useWindowDimensions";
import OptionOfCar from "./OptionOfCar";

import "./AddCar.css";

const AddCar = () => {
  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);
  const [error, SetError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [carinfo, setCarInfo] = useState({});

  const [formState, inputHandler, setFormData] = useForm(
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
        isValid: false,
      },
    },
    false
  );

  // useEffect(() => {
  //   const storedData = JSON.parse(localStorage.getItem("carData"));
  //     setCarInfo(storedData);
  // }, []);

  // useEffect(() => {
  //   if (carinfo && carinfo.brand) {
  //     console.log(carinfo.brand);
  //   }
  // }, [carinfo]);

  const calcHorsePower = (x) => {
    // return (Number(x.split("л")[0]) / 1.36).toFixed(3);
    return (x / 1.36).toFixed(3);
  };

  const arrtag = [];

  const brandItems = [
    ...new Set(arrtag.concat(Cardb.map((item) => item.brand)).flat()),
  ];

  let selectedModels;

  useEffect(() => {
    selectedModels = Cardb.filter((auto) => auto.brand.includes("Audi"));
  }, [selectedModels]);

  selectedModels = Cardb.filter((auto) =>
    auto.brand.includes(formState.inputs.brand.value)
  );

  const signupFormHandler = async (e) => {
    e.preventDefault();
    //console.log(formState.inputs);
    setIsLoading(true);
    setCarInfo(formState.inputs);
    try {
      localStorage.setItem(
        "carData",
        JSON.stringify({
          brand: formState.inputs.brand.value,
          model: formState.inputs.model.value,
          year: formState.inputs.year.value,
          plate_number: formState.inputs.plate_number.value,
          vin_number: formState.inputs.vin_number.value,
          color: formState.inputs.color.value,
          engine_type: formState.inputs.engine_type.value,
          engine_volume: formState.inputs.engine_volume.value,
          engine_power: formState.inputs.engine_power.value,
          engine_transmission: formState.inputs.engine_transmission.value,
          engine_run: formState.inputs.engine_run.value,
          pts: formState.inputs.pts.value,
          sts: formState.inputs.sts.value,
          price: formState.inputs.price.value,
          price_for3: formState.inputs.price_for3.value,
          price_more5: formState.inputs.price_more5.value,
          policy: formState.inputs.policy.value,
          insurance: formState.inputs.insurance.value,
        })
      );

      setTimeout(() => {
        setStepOne(false);
        setStepTwo(true);
      }, 2000);
    } catch (err) {
      SetError(true);
      setIsLoading(false);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
    setPositionUp(true);
  };

  const stepTwoHandler = () => {
    setStepOne(true);
    setStepTwo(false);
    setIsLoading(false);
    setPositionUp(false);
    console.log(carinfo.brand.value,carinfo.brand.isValid );
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
      {stepOne && (
        <form className="form__container-addcar" onSubmit={signupFormHandler}>
          <div className={"form__container-head"}>
            <p className={"form__container-head-subtitle"}>Шаг 1 из 4</p>
            <h1 className={"form__container-head-title"}>Новый автомобиль</h1>
          </div>

          <div className="form-content info-car">
            <h2>Информация об автомобиле</h2>

            <Input
              id="brand"
              element="select"
              label="Марка"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
              placeholderclassName="input-hidden"
              className="br-grey"
              initialValue={carinfo?.brand.value}
              initialValid={carinfo?.brand.isValid}
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
              initialValue={carinfo?.model.value}
              initialValid={carinfo?.model.isValid}
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
              validators={[
                VALIDATOR_REQUIRE(),
                VALIDATOR_NUMBER(),
                VALIDATOR_MAXLENGTH(4),
              ]}
              onInput={inputHandler}
              placeholder="0000"
              placeholderclassName="input-hidden"
              className="input-short br-grey"
              initialValue={carinfo?.year.value}
              initialValid={carinfo?.year.isValid}
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
              initialValue={carinfo?.plate_number.value}
              initialValid={carinfo?.plate.isValid}
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
              initialValue={carinfo?.vin_number.value}
              initialValid={carinfo?.vin_number.isValid}
            />
            <Input
              id="color"
              element="select"
              type="text"
              label="Цвет"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
              placeholderclassName="input-hidden"
              classNameWrapper="classNameWrapper"
              className="br-grey"
              initialValue={carinfo?.color.value}
              initialValid={carinfo?.color.isValid}
            >
              {Infocars[0].color.map((x, y) => (
                <option key={y}>{x}</option>
              ))}
            </Input>

            <Input
              id="engine_type"
              element="select"
              type="text"
              label="Тип двигателя"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
              placeholderclassName="input-hidden"
              className="br-grey"
              initialValue={carinfo?.engine_type.value}
              initialValid={carinfo?.engine_type.isValid}
            >
              {Infocars[1].engine.map((x, y) => (
                <option key={y}>{x}</option>
              ))}
            </Input>
            <Input
              id="engine_volume"
              element="input"
              type="text"
              label="Объем"
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()]}
              onInput={inputHandler}
              placeholder="1,0 л"
              placeholderclassName="input-hidden"
              className="input-short br-grey"
              initialValue={carinfo?.engine_volume.value}
              initialValid={carinfo?.engine_volume.isValid}
            />
            <div className="engine_power">
              <span>Мощность</span>
              <Input
                id="engine_power"
                element="input"
                type="text"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()]}
                onInput={inputHandler}
                placeholder="100 л.с."
                placeholderclassName="input-hidden"
                errorTextclassName="input-hidden"
                className="input-power br-grey"
                initialValue={carinfo?.engine_power.value}
                initialValid={carinfo?.engine_power.isValid}
              />
              <p className="engine_power_kw">
                {calcHorsePower(formState.inputs.engine_power.value)}
              </p>
            </div>
            <Input
              id="engine_transmission"
              element="select"
              type="text"
              label="Трансмиссия"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
              placeholderclassName="input-hidden"
              classNameWrapper="classNameWrapper"
              className="br-grey"
              initialValue={carinfo?.transmission.value}
              initialValid={carinfo?.transmission.isValid}
            >
              {Infocars[2].transmission.map((x, y) => (
                <option key={y}>{x}</option>
              ))}
            </Input>
            <Input
              id="engine_run"
              element="input"
              type="text"
              label="Пробег"
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()]}
              placeholder="10 000 км"
              onInput={inputHandler}
              placeholderclassName="input-hidden"
              className="input-short br-grey"
              initialValue={carinfo?.engine_run.value}
              initialValid={carinfo?.engine_run.isValid}
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
              initialValue={carinfo?.pts.value}
              initialValid={carinfo?.pts.isValid}
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
              initialValue={carinfo?.sts.value}
              initialValid={carinfo?.sts.isValid}
            />
          </div>

          <div className="form-content info-rent">
            <h2>Стоимость аренды</h2>
            <Input
              id="price"
              element="input"
              type="text"
              label="Обычная цена"
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()]}
              placeholder="1 500 ₽/сутки"
              onInput={inputHandler}
              placeholderclassName="input-hidden"
              className="input-short br-grey"
              initialValue={carinfo?.price.value}
              initialValid={carinfo?.price.isValid}
            />
            <Input
              id="price_for3"
              element="input"
              type="text"
              label="Цена при аренде на 3 дня"
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()]}
              placeholder="1 400 ₽/сутки"
              onInput={inputHandler}
              placeholderclassName="input-hidden"
              className="input-short br-grey"
              initialValue={carinfo?.price_for3.vaue}
              initialValid={carinfo?.price_for3.isValid}
            />
            <Input
              id="price_more5"
              element="input"
              type="text"
              label="Цена при аренде более 5 дней"
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()]}
              placeholder="1 300 ₽/сутки"
              onInput={inputHandler}
              placeholderclassName="input-hidden"
              className="input-short br-grey"
              initialValue={carinfo?.price_more5.value}
              initialValid={carinfo?.price_more5.isValid}
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
              initialValue={carinfo?.policy.value}
              initialValid={carinfo?.policy.isValid}
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
                initialValue={carinfo?.insurance.value}
                initialValid={carinfo?.insurance.isValid}
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
      )}
      {stepTwo && <OptionOfCar onClick={stepTwoHandler} />}
    </>
  );
};

export default AddCar;
