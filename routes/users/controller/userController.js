const bcrypt = require("bcryptjs");
const User = require("../model/User");
module.exports = {
  getAllUsersCallback: (req, res) => {
    User.find({}, function (err, foundAllUsers) {
      if (err) {
        res.status(500).json({ message: "Failed", errorMessage: err.message });
      } else {
        res.status(200).json({
          message: "success",
          users: foundAllUsers,
        });
      }
    });
  },


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
    //destructuring
    const { firstName, lastName, email, password } = req.body;
    try {
      const salted = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salted);
      const createdUser = new User({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password: hashedPassword,
      });
      let savedUser = await createdUser.save();
      res.render("sign-up", { success: true });
      // res.status(200).json({
      //   message: "success",
      //   user: savedUser,
      // });
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
        message: "successfully deleted",
        deletedUser: deletedUser,
      });
    } catch (error) {
      res.status(500).json({
        message: "error",
        errorMessage: error.message,
      });
    }
  },


  deleteUserByEmail: async (req, res) => {
    try {
      let deletedUser = await User.findOneAndDelete({ email: req.body.email });
      res.status(200).json({
        message: "successfully deleted",
        deletedUser: deletedUser,
      });
    } catch (error) {
      res.status(500).json({
        message: "error",
        errorMessage: error.message,
      });
    }
  },


  updateUserByID: async (req, res) => {
    try {
      let updatedUser = await User.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      res.status(200).json({
        message: "successfully updated",
        updatedUser: updatedUser,
      });
    } catch (error) {
      res.status(500).json({
        message: "error",
        errorMessage: error.message,
      });
    }
  },


  updateUserByEmail: async (req, res) => {
    try {
      let updatedUser = await User.findOneAndUpdate(
        { email: req.body.email },
        req.body,
        { new: true }
      );
      res.status(200).json({
        message: "successfully updated",
        updatedUser: updatedUser,
      });
    } catch (error) {
      res.status(500).json({
        message: "error",
        errorMessage: error.message,
      });
    }
  },


  login: async (req, res) => {
    try {
      let foundUser = await User.findOne({ email: req.body.email });
      if (!foundUser) {
        res.render("login", {
          error: {
            message: "Sorry, user does not exists please go signup!",
          },
        });

        // res.status(404).json({
        //   message: "Sorry, user does not exists please go signup!",
        // });

      } else {
        let isPasswordTrue = await bcrypt.compare(
          req.body.password,
          foundUser.password
        );

        if (isPasswordTrue) {
          req.session.user = {
            _id: foundUser._id,
            email: foundUser.email,
          };
          res.redirect("/users/home");
          // res.json({
          //   message: "success",
          //   successMessage: "Logged In!",
          // });
        } else {
          res.render("login", {
            error: {
              message: "Sorry, please check your email and password",
            },
          });
          
        }
      }
    } catch (error) {
      res.status(500).json({
        message: "error",
        errorMessage: error.message,
      });
    }
    //step 1 find the user e.g email
    //step 2 if the user doesn't exists tell
    //send a message back saying 'User not found go
    //go sign up
    //step 3 if the user is found
    //compare the password
    //if the password does not match
    //send a message back saying
    //check your email and password
    //if passord matches
    //send a message back saying
    //successfully logged In
  },

  clearCookies: (req, res) => {

    req.session.destroy(); // server side
  
    res.clearCookie("connect.sid", { // client side
      path:"/",
      httpOnly: true,
      secure: false,
      maxAge: null,
    })
  
    res.redirect("/users/login");
  
  },

  homePage: async (req, res) => {
    if (req.session.user) {
      try {
        let result = await axios.get(
          `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${req.body.search}`
        );
        console.log(result.data);
        res.render("home", { data: result.data, user: req.session.user.email });
      } catch (e) {
        res.status(500).json({
          message: "failure",
          data: e.message,
        });
      }
    } else {
      res.render("message", { error: true });
    }
  },

  checkIfUser: async function (req, res) {

    if (req.session.user) {
      res.render("home", { user: req.session.user.email });
    } else {
      res.render("message", { error: true });
    }
  
  },

  logInUser: (req, res) => {
    if (req.session.user) {
      res.redirect("/users/home");
    } else {
      res.render("login");
    }
  },

  createUser: (req, res) => {

    if (req.session.user) {
      res.redirect("/users/home");
    } else {
      res.render("sign-up");
    }
  }

};