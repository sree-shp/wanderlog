const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });
    console.log(newUser);
    const id = newUser._id;
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    newUser.password = undefined;

    res.status(201).json({
      status: "success",
      data: {
        newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      data: {
        message: err.message,
      },
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if email and password exists
    if (!email || !password) {
      throw new Error("Please provide email and password");
    }

    // Get user based on email and include password
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      throw new Error("Invalid Credentials");
    }
    const id = user._id;
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    user.password = undefined;

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      data: {
        message: err.message,
      },
    });
  }
};

exports.protect = async (req, res, next) => {
  let token;
  try {
    console.log(req.headers);
    const token = req.headers.cookie.split("=")[1];

    // If there is no token, throw new error
    if (!token) {
      throw new Error("You are not logged in! Log in to get access");
    }

    //Verify if the token is valid and await a promise
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // Check if user Exists
    const user = await User.findById(decoded.id);
    // If no user is found, throw error
    if (!user) {
      throw new Error("No User found");
    }

    // Check if user changed the password after the token was issued
    if (user.changedPasswordAfter(decoded.iat)) {
      throw new Error("User recently changed password");
    }

    res.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({
      status: "fail",
      data: {
        error: err,
        message: err.message,
      },
    });
  }
};
