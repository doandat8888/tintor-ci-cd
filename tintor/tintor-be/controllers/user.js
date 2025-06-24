const User = require("../models/User");
const { userValidate } = require("../helpers/validation");
const { verifyAccessToken } = require("../helpers/jwt_service");

module.exports = {
  getListUser: async (req, res, next) => {
    try {
      const { role, isActive, searchText } = req.query; 

      const filter = {
        ...(role && { role }), 
        ...(isActive && { isActive: isActive === 'true' }),
        ...(searchText && { fullName: { $regex: searchText, $options: 'i' } }),
      };

      const users = await User.find(filter);

      if (users) {
        const userInfos = users.map((user) => {
          const { password, ...userInfo } = user._doc;
          return userInfo;
        });
        return res.status(200).json({
          data: userInfos,
        });
      }
    } catch (error) {
      next(error);
    }
  },
  getUserById: async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        const { password, isFirstLogin, ...userInfo } = user._doc;
        return res.status(200).json({
          data: userInfo,
        });
      }
    } catch (error) {
      next(error);
    }
  },
  getCurrentUser: async (req, res, next) => {
    if (!req.headers["authorization"]) {
      return res.status(400).json({
        msg: "No bearer token provided",
      });
    }
    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];
    try {
      const payload = await verifyAccessToken(token);
      const { userId } = payload;
      const user = await User.findOne({
        _id: userId,
      });
      if (user) {
        const { password, ...userInfo } = user._doc;
        return res.status(200).json({
          data: userInfo,
        });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  updateUser: async (req, res, next) => {
    const userFound = await User.findOne({
      _id: req.params.id,
    })
    if(!userFound) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!req.headers["authorization"]) {
      return res.status(400).json({
        msg: "No bearer token provided",
      });
    }
    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];
    try {
      const payload = await verifyAccessToken(token);
      const { userId } = payload;
      //Check if user can update info
      if (userId !== req.params.id) {
        return res.status(403).json({
          msg: "Unauthorized",
        });
      }
      const staticFields = ["email", "_id", "__v",];
      const updates = Object.keys(req.body).reduce((acc, key) => {
        if (staticFields.includes(key)) {
          return;
        }
        acc[key] = req.body[key];
        return acc;
      }, {});

      const user = await User.findByIdAndUpdate(
        req.params.id,
        { $set: updates },
        { new: true } // Return new record after update
      );

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};
