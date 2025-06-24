const JWT = require("jsonwebtoken");

const signAccessToken = async (userId) => {
  return new Promise((resolve, reject) => {
    const payload = { userId };
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = {
      expiresIn: process.env.TOKEN_EXPIRE_IN,
    };

    JWT.sign(payload, secret, options, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

const verifyAccessTokenMiddleWare = (req, res, next) => {
  if (!req.headers["authorization"]) {
    return res.status(400).json({
      msg: "No bearer token provided",
    });
  }
  const authHeader = req.headers["authorization"];
  const bearerToken = authHeader.split(" ");
  const token = bearerToken[1];
  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      if (err.name === "JsonWebTokenError") {
        return res.status(400).json({
          msg: "Unauthorized",
        });
      }
      return res.status(400).json({
        msg: err.message,
      });
    }
    res.payload = payload;
    next();
  });
};

const signRefreshToken = async (userId) => {
  return new Promise((resolve, reject) => {
    const payload = { userId };
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const options = {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN,
    };

    JWT.sign(payload, secret, options, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

const verifyRefreshToken = async (refreshToken) => {
  return new Promise((resolve, reject) => {
    JWT.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, payload) => {
        if (err) {
          return reject(err);
        }
        resolve(payload);
      }
    );
  });
};

const verifyAccessToken = async (accessToken) => {
  return new Promise((resolve, reject) => {
    JWT.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        return reject(err);
      }
      resolve(payload);
    });
  });
};

module.exports = {
  signAccessToken,
  verifyAccessTokenMiddleWare,
  signRefreshToken,
  verifyRefreshToken,
  verifyAccessToken,
};
