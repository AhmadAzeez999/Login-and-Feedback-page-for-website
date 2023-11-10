const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const user_shcema  = mongoose.Schema({

username: {
    type: String,
    required: true,

},
useremail: {
    type: String,
    unique: true,
    required: true,
    
},
password: {
    type: String,
    required: true,
    minlength: [8, "The minimum length of the password should be 8"],
    pass_change: String
}, 

confirmPassword: {
    type: String
}
});
const userModel = mongoose.model('tech-app-user', user_shcema);

module.exports = userModel;