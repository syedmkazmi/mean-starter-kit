/**
 * Created by syedkazmi on 22/08/2017.
 */

const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema =  new mongoose.Schema({
    email: String,
    password: String,
    fullName: String,
});


// generate hash for password
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// validate passwords for users
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};


// generate JWT tokens for valid users
userSchema.methods.generateJwt = function () {
    let expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
       _id: this._id,
        email: this.email,
        fullName: this.fullName,
        exp: parseInt(expiry.getTime()/1000),
    }, process.env.JWT_SECRET);

};

mongoose.model('Users', userSchema);