const bcrypt = require("bcryptjs");
const User = require("../model/User");
module.exports = {
  //v2 callback
  // signup: (body, callback) => {
  //   bcrypt.genSalt(10, function (err, salt) {
  //     if (err) {
  //       return callback(err, null);
  //     } else {
  //       bcrypt.hash(body.password, salt, function (err, hashedPassword) {
  //         if (err) {
  //           return callback(err, null);
  //         } else {
  //           const createdUser = new User({
  //             firstName: body.firstName,
  //             lastName: body.lastName,
  //             email: body.email,
  //             password: hashedPassword,
  //           });
  //           createdUser.save(function (err, userCreatedInfo) {
  //             if (err) {
  //               return callback(err, null);
  //             } else {
  //               return callback(null, userCreatedInfo);
  //             }
  //           });
  //         }
  //       });
  //     }
  //   });
  // },
  // v3 promises
  // signup: (body) => {
  //   return new Promise((resolve, reject) => {
  //     bcrypt
  //       .genSalt(10)
  //       .then((salt) => {
  //         bcrypt
  //           .hash(body.password, salt)
  //           .then((hashedPassword) => {
  //             const createdUser = new User({
  //               firstName: body.firstName,
  //               lastName: body.lastName,
  //               email: body.email,
  //               password: hashedPassword,
  //             });
  //             createdUser
  //               .save()
  //               .then((savedUser) => {
  //                 resolve(savedUser);
  //               })
  //               .catch((error) => {
  //                 reject(error);
  //               });
  //           })
  //           .catch((error) => {
  //             reject(error);
  //           });
  //       })
  //       .catch((error) => {
  //         reject(error);
  //       });
  //   });
  // },
  //v4 async and await


  getAllUsers: async (req, res) => {
    try {
      const foundAllUsers = await User.find({});
      res.status(200).json({
        message: "success",
        users: foundAllUsers,
      });
    } catch (error) {
      res.status(500).json({
        message: "failure",
        errorMessage: error.message,
      });
    }
  },


  signup: async (req, res) => {
    try {
      const salted = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salted);
      const createdUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
      });
      let savedUser = await createdUser.save();
      res.status(200).json({
        message: "success",
        user: savedUser,
      });
    } catch (error) {
      res.status(500).json({
        message: "error",
        errorMessage: error.message,
      });
    }
  },


  deleteUserByID: async (req, res) => {
    try {
      let deletedUser = await User.findByIdAndDelete({ _id: req.params.id });

      res.status(200).json({
        message: "successfully Deleted",
        deletedUser: deletedUser,
      });

    } catch (error) {
      res.status(500).json({
        message: "error",
        errorMessage: error.message
      });
    }
  },

  deleteUserByEmail: async (req, res) => {
    try {
      let deletedUser = await User.findOneAndDelete({ email: req.body.email });

      res.status(200).json({
        message: "successfully deleted",
        deletedUser: deletedUser
      });

    } catch (error) {
      res.status(500).json({
        message: "error",
        errorMessage: error.message
      });
    }
  }
};