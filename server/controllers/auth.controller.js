const User = require("../models/User");
const { validationResult } = require("express-validator");
const tokenService = require("../services/token.service");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: {
          message: errors.array()[0].msg,
          code: 400,
          path: errors.array()[0].path,
        },
      });
    }

    const { email, password, isAdmin } = req.body;

    const exitingUser = await User.findOne({ email });

    if (exitingUser) {
      return res.status(400).json({
        error: {
          message: "Пользователь с таким email уже зарегистрирован",
          code: 400,
          path: "email",
        },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      ...req.body,
      role: isAdmin ? "admin" : "user",
      password: hashedPassword,
    });

    const tokens = tokenService.generate({ _id: newUser._id });
    await tokenService.save(newUser._id, tokens.refreshToken);

    res.status(201).send({ ...tokens, userId: newUser._id, user: newUser });
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
};

exports.signIn = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: {
          message: "INVALID_DATA",
          code: 400,
        },
      });
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).send({
        error: {
          message: "Email не найден",
          code: 400,
          path: "email",
        },
      });
    }

    const isPasswordEqual = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordEqual) {
      return res.status(400).send({
        error: {
          message: "Неверный пароль",
          code: 400,
          path: "password",
        },
      });
    }

    const tokens = tokenService.generate({ _id: existingUser._id });
    await tokenService.save(existingUser._id, tokens.refreshToken);

    res
      .status(200)
      .send({ ...tokens, userId: existingUser._id, user: existingUser });
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
};
