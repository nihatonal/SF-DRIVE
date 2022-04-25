import React from "react";

import Logo from "../../shared/Components/Navigation/Logo";
import Button from "../../shared/Components/FormElements/Button";
import Success from "../../assets/images/addcarsuccess.png";

import "./AddCarSuccess.css";

const SignUpSuccess = () => {
  return (
    <React.Fragment>
      <Logo />
      <div className="container-success">
        <img src={Success} />

        <h2 className="container-success-title">Успех!</h2>

        <p className="container-success-text">
          Автомобиль добавлен. Дождитесь, когда указанная вами информация
          пройдёт проверку модераторами.
        </p>

        <Button size={" button--big"} to={"/user"}>
          Перейти на главную
        </Button>
      </div>
    </React.Fragment>
  );
};

export default SignUpSuccess;
