import React, { useEffect, useState } from "react";
import style from "./forms.module.css";
import TextField from "../common/form/TextField";
import CheckBoxField from "../common/form/CheckBoxField";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getAuthErrors, signUp } from "../../store/auth";
import { useNavigate } from "react-router-dom";

export const RegisterForm = ({ onClick }) => {
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
        dispatch(signUp(data, navigate));
      })
      .catch(({ path, errors }) => {
        setErrors((prev) => ({ ...prev, [path]: errors[0] }));
      });
  };
  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <h2>Зарегистрироваться</h2>
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
      <CheckBoxField
        value={data.isAdmin}
        onChange={handleChange}
        name="isAdmin"
      >
        Администратор:
      </CheckBoxField>
      <button type="submit" disabled={!isValid} className={style.submit}>
        Зарегистрироваться
      </button>
      <span>
        {" "}
        У вас уже есть аккаунт?{" "}
        <span className={style.reg} onClick={onClick}>
          Войти
        </span>
      </span>
    </form>
  );
};
