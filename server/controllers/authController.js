const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

// Controller for Signup route
exports.signup = async (req, res, next) => {
  try {
    // Create a new user on the user model with name, email, password, confirmPassword received from client request
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });

    // Sign a JWT token with the Id of the new user as the payload
    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // Store the token as a httpOnly Secure cookie on response object
    res.cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    // Password field should not be sent to the client. Therefore, set it to undefined
    newUser.password = undefined;

    // Send response with status code 201, and with the data of new user
    res.status(201).json({
      status: "success",
      data: {
        newUser,
      },
    });
  } catch (err) {
    // Send Response with status code 400 and with the error message
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

    // If no new user is found or if the correctPassword instance method returns false , throw new Error
    if (!user || !(await user.correctPassword(password, user.password))) {
      throw new Error("Invalid Credentials");
    }

    // Sign a JWT token with the Id of the new user as the payload

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // Store the token as a httpOnly Secure cookie on response object
    res.cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    // Password field should not be sent to the client. Therefore, set it to undefined
    user.password = undefined;

    // Send response with status code 200, and with the data of the user
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    // Send Response with status code 400 and with the error message
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
    // Store only the token in the req.headers, by splitting it based on "="
    const token = req.headers.cookie.split("=")[1];

    // If there is no token, throw new error
    if (!token) {
      throw new Error("You are not logged in! Log in to get access");
    }

    //Verify if the token is valid and await a promise
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // Check if user Exists
    const user = await User.findById(decoded._id);

    // If no user is found, throw error
    if (!user) {
      throw new Error("No User found");
    }

    // Check if user changed the password after the token was issued
    if (user.changedPasswordAfter(decoded.iat)) {
      throw new Error("User recently changed password");
    }

    // Store user in the request object
    req.user = user;
    // Move to next middleware
    next();
  } catch (err) {
    // Send Response with status code 400 and with the error message
    res.status(401).json({
      status: "fail",
      data: {
        error: err,
        message: err.message,
      },
    });
  }
};
