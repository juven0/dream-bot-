const mongoose  = require('mongoose')

const userSchema  = new mongoose.Schema(
    {
        userId : {
            type :String,
            state : String,
            required: true,
        }
    }
)
const userModel = mongoose.model('user' , userSchema);
module.exports  = userModel;