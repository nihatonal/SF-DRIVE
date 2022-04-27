import React, { useEffect, useContext, useState } from "react";

import Avatar from "../../shared/Components/UIElements/Avatar";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./CarInfo.css";

const CarInfo = (props) => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const [loadedUser, setLoadedUser] = useState();

  const userId = auth.userId;

  useEffect(() => {
    if (auth.isLoggedIn) {
      const fetchPlaces = async () => {
        try {
          const responseData = await sendRequest(
            `http://localhost:5000/api/users/${userId}`
          );
          setLoadedUser(responseData.user);
        } catch (err) {}
      };

      fetchPlaces();
    }
  }, [sendRequest, userId]);

  return (
    <div className="carinfo-container">
      <div className="carinfo-images_wrapper">
        <div className="carinfo-image_wrapper main-photo">
          <img
          className={`main-img`}
            src={`http://localhost:5000/${props.mainImg}`}
            alt={props.model}
          />
        </div>
        <div className="carinfo-image_wrapper side-image-1">
          <img
           className={`second-img`}
            src={`http://localhost:5000/${props.secondImg}`}
            alt={props.model}
          />
        </div>
        <div className="carinfo-image_wrapper side-image-2">
          <img
           className={`second-img`}
            src={`http://localhost:5000/${props.thirdImg}`}
            alt={props.model}
          />
        </div>
      </div>
      <div className="carinfo-maincontent-wrapper">
        <div className="carinfo-maincontent">
          <h2>{`${props.brand} ${props.model}, ${props.year}`}</h2>
          <div className="carinfo-maincontent-prices">
            <div className="carinfo-maincontent-price-item">
              <p>{`${props.price} ₽/сут.`}</p>
              <span>обычная аренда</span>
            </div>
            <div className="carinfo-maincontent-price-item">
              <p>{`${props.price_for3} ₽/сут.`}</p>
              <span>при аренде на 3 дня</span>
            </div>
            <div className="carinfo-maincontent-price-item">
              <p>{`${props.price_more5} ₽/сут.`}</p>
              <span>при аренде более 5 дней</span>
            </div>
          </div>
        </div>
        <div className="owner-wrapper">
          {loadedUser && (
            <Avatar
              className={"owner-wrapper-image"}
              image={`http://localhost:5000/${loadedUser.image}`}
              alt={"avatar"}
            />
          )}
          {loadedUser && <p>{loadedUser.name}</p>}
          {loadedUser && <p>Это вы</p>}
        </div>
      </div>
    </div>
  );
};

export default CarInfo;
