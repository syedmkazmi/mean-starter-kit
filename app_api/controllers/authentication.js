
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('Users');
mongoose.Promise = Promise;

let sendJsonResponse = (res, status, content) => {
  res
      .status(status)
      .json(content);
};

// register function
let register = (req,res) => {

    if(!req.body.fullName || !req.body.email || !req.body.password){
        sendJsonResponse(res, 400, {"message": "All fields required"});
        return;
    }

    let user = new User();

    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = user.generateHash(req.body.password);

    user.save((err) => {
        let token;

        if(err){ sendJsonResponse(res, 404, err);}
        else {
            token = user.generateJwt();
            sendJsonResponse(res, 200, {
               "token": token
            });
        }
    });

};

// login function
let login = (req,res) => {

    if(!req.body.email || !req.body.password){
        sendJsonResponse(res, 400, {"message": "All fields required"});
        return;
    }

    passport.authenticate('local', (err, user, info) => {
        let token;

        if(err){
            sendJsonResponse(res, 404, err);
            return;
        }

        if(user){
            token = user.generateJwt();
            sendJsonResponse(res, 200, {"token": token});
         } else {
            sendJsonResponse(res, 401, info);
        }
    })(req,res);
};

module.exports = {
    register,
    login
};