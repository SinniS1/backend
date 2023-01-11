const bcrypt = require("bcrypt");
const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const authUser = async (req, res) => {
  const { Username, Password } = req.body;
  if (!Username || !Password) {
    return res.status(400).json({ message: "Username & Password both are required" });
  }
  const founUser = userDB.users.find((person) => person.Username === Username);
  if (!founUser) {
    return res.status(401).send(`You are not Authorized`);
  }
  //  evaluate password
  const match = await bcrypt.compare(Password, founUser.Password);
  if (!match) {
    return res.status().send("Please enter correct password");
  } else {
    // Todo: create JWT
    return res.status(200).json({ Success: `User ${founUser.Username} is logged in!` });
  } 
};

module.exports = authUser;
