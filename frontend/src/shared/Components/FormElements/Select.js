import React, { useCallback, useContext, useEffect, useState } from "react";

import OutsideClickHandler from "../../../shared/util/OutsideClickHandler";
import menu_dropdown from "../../../assets/icons/menu-down.svg";
import "./Select.css";

const Select = (props) => {
  const [showList, setShowList] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const openHandler = () => {
    setShowList(true)
  }
  const onChangeHandler =(item)=> {
    setShowList(false)
    setSelectedItem(item)
  }
  return (
     (
      <>
        <img className="menu-dropdown" src={menu_dropdown} alt="menu-dropdown" />
        <p
          className={`select-input ${props.classSelectInput}`}
          onClick={openHandler}
        >
          {selectedItem || props.value}
        </p>
       {showList && <div id="droplist" className="droplist-container">
          {props.data.map((x, y) => (
            <div className="droplist-item" key={y}>
              <input
                className="radio"
                id={y}
                type="radio"
                name="selected-item"
                value={x}
                hidden
                onClick={()=> onChangeHandler(x)}
              />
              <label htmlFor={y}>{x}</label>
            </div>
          ))}
        </div>}
      </>
    )
  );
};

export default Select;
