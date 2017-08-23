/**
 * Created by syedkazmi on 22/08/2017.
 */
//const crypto = require('crypto');
const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema =  new mongoose.Schema({

    email: String,
    password: String,
    fullName: String,
    hash: String,
    salt: String

});

// generate hash for password
userSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// validate passwords for users
userSchema.validPassword = (password) => {
    return bcrypt.compareSync(password, this.password);
};

// generate JWT tokens for valid users
userSchema.methods.generateJwt = () => {

    let expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
       _id: this._id,
        email: this.email,
        fullName: this.fullName,
        exp: parseInt(expiry.getTime()/1000),
    }, process.env.JWT_SECRET);

};

/*userSchema.methods.setPassword = (password) => {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = (password) => {
    let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
};*/

mongoose.model('Users', userSchema);