/**
 * Created by syedkazmi on 22/08/2017.
 */

const mongoose = require('mongoose');
const User = mongoose.model('Users');

const createUser = (req,res) => {

  User.find((err,user)=>{
      if(user){
          res
              .status(200)
              .json({user})
      }
  });
  //console.log(`${req.body.fullName}`);
};

module.exports = {
    createUser
};