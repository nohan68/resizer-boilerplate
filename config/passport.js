const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findOne({id}, (err, user) => {
    cb(err,user);
  });
});


passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
},(username,password,cb) => {
  User.findOne({username}, (err,user)=> {
    if(err){
      return cb(err);
    }
    if(!user){
      return cb(null, null , {message: 'Username not found'});
    }
    bcrypt.compare(password,user.password, (err,res) => {
      if(err){
        return cb(err);
      }
      if(!res){
        return cb(null, null, {message: 'Password unvalid'});
      }
      return cb(null, user, {message: 'Login successful'});
    });
  });
}

));
