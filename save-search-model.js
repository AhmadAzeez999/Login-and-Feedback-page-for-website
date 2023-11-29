const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const user_shcema  = mongoose.Schema({

user_email: {
    type: String,
    required:true
},

user_link: {
    type: String,
    required: true,
}
});
const userModel = mongoose.model('tech-app-saved-data', user_shcema);

module.exports = userModel;