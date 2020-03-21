/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    jwt.verify(authorization, secrets.jwtSecret, function(err, decodeToken) {
      if (err) {
        res.status(401).json({ you: "shall not pass!" });
      } else {
        req.token = decodeToken;
        next();
      }
    });
  } else {
    return res.status(400).json({ message: "Invalid credentials" });
  }
};
