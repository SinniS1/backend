const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");
const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const createNewUser = async (req, res) => {
  const { Username, Password } = req.body;
  if (!Username || !Password) {
    return res.status(400).json({ message: "Username & Password both are required" });
  }

  const duplicate = usersDB.users.find((person) => {
    person.Username === Username;
  });
  if (duplicate) {
    return res.status(409).json({ message: "This Account already in use" });
  }
  try {
    // encrypt the password
    const encryptPwd = await bcrypt.hash(Password, 10);
    // Store the new User
    const newUser = { Username: Username, Password: encryptPwd };
    usersDB.setUsers([...usersDB.users, newUser]);
    res.status(200).json(usersDB.users);
    fsPromises.writeFile(path.join(__dirname, "..", "model", "users.json"), JSON.stringify(usersDB.users));
  } catch (error) {
    res.status(500).json({ message: `Oops Somthing went wrong -> ${error.message}` });
  }
};

module.exports = { createNewUser };
