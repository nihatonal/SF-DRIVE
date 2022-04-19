import React, { useCallback, useContext, useEffect, useState } from "react";

import OutsideClickHandler from "../../../shared/util/OutsideClickHandler";
import menu_dropdown from "../../../assets/icons/menu-down.svg";
import "./Select.css";

const Select = (props) => {
  const [selected, setSelected] = useState(props.selected);
  const [showList, setShowList] = useState(false);

  const onChangeHandler = (item) => {
    setShowList(false);
    setSelected(item);
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
      <div className="select-wrapper">
        <label className="select-label">{props.label}</label>
        <img
          className="menu-dropdown"
          src={menu_dropdown}
          alt="menu-dropdown"
        />
        <p className={`select-input ${props.classSelectInput}`} onChange={props.onChange} onClick={focusHandler} value={props.value}>{selected}</p>
        {showList && (
          <div id="droplist" className="droplist-container">
            {props.data.map((x, y) => (
              <div className="droplist-item" key={y}>
                <input
                  className="radio"
                  id={y}
                  type="radio"
                  name="selected-item"
                  value={x}
                  onChange={props.onChange}
                  hidden
                />
                <label htmlFor={y} onClick={() => onChangeHandler(x)}>
                  {x}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
};

export default Select;
