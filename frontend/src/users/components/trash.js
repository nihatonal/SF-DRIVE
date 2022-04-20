import React, { useCallback, useContext, useEffect, useState } from "react";

import OutsideClickHandler from "../../../shared/util/OutsideClickHandler";
import menu_dropdown from "../../../assets/icons/menu-down.svg";
import { useForm } from "../../../shared/hooks/SignUpFrom-hook";
import Input from "./Input";
import "./Select.css";

const Select = (props) => {
  const [showList, setShowList] = useState(false);
  const [formState, inputHandler] = useForm({})

  const onChangeHandler = (item) => {
    setShowList(false);
  };

  const focusHandler = () => {
    setShowList(true);
  };

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setShowList(false);
      }}
    >
      <Input
        id={props.id}
        element="select"
        label={props.label}
        onInput={inputHandler}
        placeholderclassName="input-hidden"
        className="br-grey"
        validators={props.validators}
        onClick={focusHandler}
        initialValue={props.initialValue}
        initialValid={props.initialValid}
      >
        {/* <label className="select-label">{props.label}</label> */}
        <img
          className="menu-dropdown"
          src={menu_dropdown}
          alt="menu-dropdown"
        />
        <p
          className={`select-input ${props.classSelectInput}`}
          onChange={props.onChange}
          onClick={focusHandler}
          id={props.id}
        >
          {props.initialValue}
        </p>
        {showList && (
          <div
            id="droplist"
            className="droplist-container"
            onClick={props.onClick}
          >
            {props.data.map((x, y) => (
              <div className="droplist-item" key={y}>
                <input
                  className="radio"
                  id={y}
                  type="radio"
                  name="selected-item"
                  value={x}
                  hidden
                />
                <label htmlFor={y} onClick={() => onChangeHandler(x)}>
                  {x}
                </label>
              </div>
            ))}
          </div>
        )}
      </Input>
      {/* <div className="select-wrapper"></div> */}
    </OutsideClickHandler>
  );
};

export default Select;
