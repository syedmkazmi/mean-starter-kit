/**
 * Created by syedkazmi on 22/08/2017.
 */

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('Users');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, function (username, password, done) {
        User.findOne({email: username}, (err, user) => {
            if(err){
                return done(err);
            }

            if(!user){
                return done(null, false, {message: 'Incorrect Username.'});
            }

            if(!user.validPassword(password)){
                return done(null, false, {message: 'Incorrect Password.'});
            }
            return done(null, user);
        });
    }
));