/**
 * Created by syedkazmi on 22/08/2017.
 */

const mongoose = require('mongoose');
const User = mongoose.model('Users');
mongoose.Promise = Promise;

let getAllUsers = (req,res) => {
  User.find()
      .exec()
      .then((user)=>{
        if(user) {
            return res
                .status(200)
                .json({user})
        }
      })
      .catch((err)=>{
        return res
            .status(500)
            .json(err)
     });
  //console.log(`${req.body.fullName}`);
};

module.exports = {
    getAllUsers
};