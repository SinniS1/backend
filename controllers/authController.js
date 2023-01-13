const bcrypt = require("bcrypt");
const { json } = require("express");
const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const jwt = require("jsonwebtoken");
require("dotenv").config();
const fsPromises = require("fs").promises;
const path = require("path");

const authUser = async (req, res) => {
  const { Username, Password } = req.body;
  if (!Username || !Password) {
    return res.status(400).json({ message: "Username & Password both are required" });
  }
  const foundUser = userDB.users.find((person) => person.Username === Username);
  if (!foundUser) {
    return res.status(401).send(`You are not Authorized`);
  }
  //  evaluate password
  const match = await bcrypt.compare(Password, foundUser.Password);
  if (!match) {
    return res.status().send("Please enter correct password");
  } else {
    // Todo: create JWT
    const accessToken = jwt.sign({ Username: foundUser.Username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
    const refreshToken = jwt.sign({ Username: foundUser.Username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
    const othrUser = userDB.users.filter((person) => person.Username !== foundUser.Username);
    const currentUser = { ...foundUser, refreshToken };
    userDB.setUsers([...othrUser, currentUser]);
    await fsPromises.writeFile(path.join(__dirname, "..", "model", "users.json"), JSON.stringify(userDB.users));
    res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    return res.status(200).json({ accessToken });
  }
};

module.exports = authUser;
