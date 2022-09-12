var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const Moment = require("moment");
var connection = require('../../start/mongoose').get();

const UserSchema = new Schema({
    email: {
        type: 'String',
        required: true
    },
    username: {
        type: 'String',
        default: null
    },
    phone_number: {
        type: 'String',
        default: null
    },
    skillset: {
        type: 'String',
        default: null
    },
    hobby: {
        type: 'String',
        default: null
    },
    status: {
        type: 'Number',
        default: 1
    },
    createdDatetime: {
        type: 'Number',
        default: Moment().unix(),
    },
    lastActiveTime: {
        type: 'Number',
        default: null,
    },
}, {
    minimize: false,

},);

UserSchema.statics.createUser = function (
    email,
    username,
    phone_number,
    skillset,
    hobby,
) {
    return this.create({
        email: email.toLowerCase(),
        username,
        phone_number,
        skillset,
        hobby,
    });
};


UserSchema.statics.emailExists = async function (email) {
    return (await this.countDocuments({
        email: email.toLowerCase(),
        status: {
            $ne: 0
        }
    })) > 0;
};

UserSchema.statics.userNameExists = async function (username) {
    return (await this.countDocuments({
        username: username,
        status: {
            $ne: 0
        }
    })) > 0;
};
const User = connection.model('user', UserSchema);

module.exports = User;