var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");

/* GET users listing. */
router.post("/register", (req, res) => {
  const register = req.body;

  bcrypt.hash(register.password, 10).then((hash) => {
    const user = new User({
      ...register,
      password: hash,
    });

    const promise = user.save();

    promise
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      });
  });
});

router.post("/login", (req, res) => {
  const { nameAndSurname, email, password } = req.body;

  User.findOne(
    {
      email,
    },
    (err, user) => {
      if (err) throw err;

      if (!user) {
        res.json({
          status: false,
          message: "Authentication failed, user not found.",
        });
      } else {
        bcrypt.compare(password, user.password).then((result) => {
          if (!result) {
            res.json({
              status: false,
              message: "Authentication failed, wrong password.",
            });
          } else {
            const payload = {
              email,
            };
            console.log(user._id);
            const token = jwt.sign(payload, req.app.get("api_secret_key"), {
              expiresIn: 720, // 12 saat
            });
            res.send({
              status: true,
              token,
            });
          }
        });
      }
    }
  );
});

module.exports = router;
