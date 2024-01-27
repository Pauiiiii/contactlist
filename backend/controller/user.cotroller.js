const { Users } = require('../model/user.model');

exports.getUsers = async (req, res) => {
    let userList = await Users.find({});
    if ( userList) {
        res.status(200).json({message: "Success", data: userList});
    } else {
        res.status(400).json({message: "Internal Server Error"});
    }  
}

exports.saveUser = async function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    try {
      let existingUser = await Users.exists({ username: username });
  
      if(existingUser) {
        res.status(400).json({message: "User already exist."})
      } else {
        let newUser = new Users ({
          username: username,
          password: password
        });
    
        if (newUser) {
          let savedUser = await newUser.save();
          res.status(200).json({message: "Success", user: savedUser});  
        } else {
          res.status(400).json({message: "Bad Request: Invalid data"});
        };  
      }
    } catch(err) {
      console.log(err);
      res.status(500).json({message: "Internal Server Error"});
    }
  }

  exports.authenticateUser = async function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    try {
      let existingUser = await Users.exists({ username: username, password: password });
  
      if(existingUser) {
        res.status(200).json({message: "Authenticated."})
      } else {
        res.status(400).json({message: "Invalid username or password."});
      }
    } catch(err) {
      console.log(err);
      res.status(500).json({message: "Internal Server Error"});
    }
  }
  
  
  