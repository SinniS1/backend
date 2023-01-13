const { json } = require("express");
const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(401);
  }
  console.log(cookies.jwt);
  const refreshToken = cookies.jwt;
  const foundUser = userDB.users.find((person) => person.refreshToken === refreshToken);
  if (!foundUser) {
    return res.sendStatus(401).send(`You do not have correct Refresh Token`);
  }
  //  evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.Username !== decoded.Username) {
      console.log(`error in verifying refresh token ${err}`);
      return res.sendStatus(403);
    }
    const AccessToken = jwt.sign({ Username: decoded.Username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30S" });
    res.json({ AccessToken });
  });
};

module.exports = handleRefreshToken;
