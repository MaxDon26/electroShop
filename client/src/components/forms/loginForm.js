import React, { useEffect, useState } from "react";
import style from "./forms.module.css";
import TextField from "../common/form/TextField";

import * as yup from "yup";
import { getAuthErrors, login } from "../../store/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const LoginForm = ({ onClick }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    isAdmin: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(getAuthErrors());

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (error) {
      setErrors(error);
    }
  }, [error]);

  const validateSchema = yup.object().shape({
    password: yup
      .string()
      .required("Поле обязательно для заполнения")
      .min(3, "Пароль должен содержать не менее 3 символов")
      .matches(/^\S+$/, "Пароль не должен содержать пробелы")
      .matches(/[A-Z]+/, "Пароль должен содержать минимум одну заглавную букву")
      .matches(/\d/, "Пароль должен содержать минимум одну цифру"),
    email: yup
      .string()
      .email("Email должен соответствовать шаблону example@google.com")
      .required("Поле обязательно для заполнения"),
  });

  const validate = async () => {
    await validateSchema.validate(data);
  };

  const handleChange = (target) => {
    const { name, value } = target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const isValid = Object.values(errors).filter((el) => el).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    validate()
      .then(() => {
        setErrors({});
        dispatch(login(data, navigate));
      })
      .catch(({ path, errors }) => {
        setErrors((prev) => ({ ...prev, [path]: errors[0] }));
      });
  };
  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <h2>Войти</h2>
      <TextField
        label="Электронная почта"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Пароль"
        name="password"
        type="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <button type="submit" disabled={!isValid} className={style.submit}>
        Войти
      </button>
      <span>
        У вас нет аккаунта?{" "}
        <span className={style.reg} onClick={onClick}>
          Зарегистрироваться
        </span>
      </span>
    </form>
  );
};
