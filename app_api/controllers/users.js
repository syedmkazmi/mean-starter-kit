/**
 * Created by syedkazmi on 22/08/2017.
 */

const mongoose = require('mongoose');
const User = mongoose.model('Users');

const createUser = (req,res) => {
  console.log(`${req.body.fullName}`);
  res
      .status(200)
      .json({"status": "success"})
};

module.exports = {
    createUser
}