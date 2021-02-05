const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NameSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    openid: {
        type: String,
        required: true
    }
},
    {
        versionKey: false
    }
)

module.exports = UserName = mongoose.model('userInfo', NameSchema);