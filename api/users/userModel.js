import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const Schema = mongoose.Schema;

var validatePassword = function(password) {
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
  return re.test(password)
};
const UserSchema = new Schema({
  username: { type: String, unique: true, required: true},
  password: {type: String, required: true , validate: [validatePassword] },
  favourites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movies'}]
});

UserSchema.pre('save', function(next) {
  const user = this;
  if (this.isModified('password') || this.isNew) {
      bcrypt.genSalt(10, (err, salt)=> {
          if (err) {
              return next(err);
          }
          bcrypt.hash(user.password, salt, null, (err, hash)=> {
              if (err) {
                  return next(err);
              }
              user.password = hash;
              next();
          });
      });
  } else {
      return next();
  }
});

UserSchema.statics.findByUserName = function (username) {
  return this.findOne({ username: username });
};

UserSchema.methods.comparePassword = function (passw, callback) {
  bcrypt.compare(passw, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

export default mongoose.model('User', UserSchema);