var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const saltWorkFactor = 10;

var connection = require('../../start/mongoose').get();


const AdminSchema = new Schema({
    email: {
        type: 'String',
        required: true
    },
    password: {
        type: 'String',
        default: null
    },
}, {
    minimize: false,

}, );


AdminSchema.pre('save', async function (next) {
    const that = this;
    if (that.isModified('password')) {
        try {
            const hashPassword = await bcrypt.hash(
                that.password,
                saltWorkFactor,
            );
            that.password = hashPassword;
        } catch (err) {
            return next(err);
        }
    }
    next();
});

AdminSchema.methods.comparePassword = function (hashPassword) {
    return bcrypt.compare(hashPassword, this.password);
};

AdminSchema.statics.createUser = function (
    email,
    password,
) {
    return this.create({
        email: email.toLowerCase(),
        password,
    });
};

AdminSchema.statics.emailExists = async function (email) {
    return (await this.countDocuments({
        email: email.toLowerCase(),
    })) > 0;
};

AdminSchema.statics.checkPassword = async function (email, password) {
    try {
        const admin = await this.findOne({
            email: email.toLowerCase(),
        })
        if (!admin) {
            return {
                status: false,
            };
        }
        const match = await admin.comparePassword(password);
        return {
            status: match,
            admin,
        };
    } catch (error) {
        throw error;
    }
};
const Admin = connection.model('admins', AdminSchema);

module.exports = Admin;