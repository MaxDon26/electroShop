import React, { useState } from "react";
import style from "./login.module.css";

import { Box } from "../../components/common/box";
import { LoginForm, RegisterForm } from "../../components/forms";

export const Login = () => {
  const [isReg, setisReg] = useState(false);
  const handleClick = () => {
    setisReg((prev) => !prev);
  };
  return (
    <Box classes={style.formBox}>
      {isReg ? (
        <RegisterForm onClick={handleClick} />
      ) : (
        <LoginForm onClick={handleClick} />
      )}
    </Box>
  );
};
