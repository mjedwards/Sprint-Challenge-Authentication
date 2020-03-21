const router = require("express").Router();
const db = require("./model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrects = require("../config/secrets");

router.post("/register", (req, res) => {
  // implement registration
  const user = req.body;

  const hash = bcrypt.hashSync(user.password, 12);

  user.password = hash;

  db.register(user)
    .then(newUser => {
      if (newUser) {
        res.status(201).json(newUser);
      } else {
        res.json({ message: "New User could not be created" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error" });
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  db.login({ username })
    .first()
    .then(userInfo => {
      console.log(userInfo);
      if (userInfo && bcrypt.compareSync(password, userInfo.password)) {
        const token = generateToken(userInfo);

        res.status(200).json({
          welcome: userInfo.username,
          token
        });
      }
    })
    .catch(err => {
      res.status(500).json({ errMessage: err, message: "Nothing here" });
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: "60s"
  };
  return jwt.sign(payload, secrects.jwtSecret, options);
}

module.exports = router;
