const User = require("../models/User");
const { userValidate } = require("../helpers/validation");
const { signAccessToken, signRefreshToken } = require("../helpers/jwt_service");

module.exports = {
  register: async (req, res, next) => {
    try {
      const { email, password, fullName } = req.body;
      const { error } = userValidate(req.body);
      if (error) {
        console.log("Error: ", error.details[0].message);
        return res.status(400).json({
          msg: "Wrong user information",
        });
      }
      const isExist = await User.findOne({
        email: email,
      });
      if (isExist)
        return res.status(400).json({
          msg: "Email has already existed",
        });
      const user = new User({
        email,
        password,
        fullName,
        role: 'unknown',
        isFirstLogin: true,
      });

      const isCreate = await user.save();

      if (isCreate) {
        const accessToken = await signAccessToken(user._id);
        const refreshToken = await signRefreshToken(user._id);
        return res.status(200).json({
          accessToken,
          refreshToken,
        });
      }
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.json({ 
          msg: "Missing email or password",
        });
      }
      const user = await User.findOne({
        email: email,
      });
      if (!user) {
        return res.status(400).json({
          msg: "Email is not existed",
        });
      }
      const isValidPassword = await user.isCheckPassword(password);
      if (!isValidPassword) {
        return res.status(400).json({
          msg: "Wrong password",
        });
      }

      const accessToken = await signAccessToken(user._id);
      const refreshToken = await signRefreshToken(user._id);
      return res.status(200).json({
        accessToken,
        refreshToken,
      });
    } catch (error) {
      return res.status(400).json({ msg: "Internal server error" });
    }
  },
  refreshToken: async (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) throw createError.BadRequest();
      const payload = await verifyRefreshToken(refreshToken);
      const { userId } = payload;
      const newAccessToken = await signAccessToken(userId);
      const newRefreshToken = await signRefreshToken(userId);
      return res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    } catch (error) {
      next(error);
    }
  },
};
