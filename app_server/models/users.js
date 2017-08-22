/**
 * Created by syedkazmi on 22/08/2017.
 */
//const crypto = require('crypto');
const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');

const userSchema =  new mongoose.Schema({

    email: String,
    password: String,
    fullName: String,
    hash: String,
    salt: String

});

userSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.validPassword = (password) => {
    return bcrypt.compareSync(password, this.password);
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