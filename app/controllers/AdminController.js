const Admin = require("../models/Admin");
const Event = require('../../start/events');
const jwt = require("jsonwebtoken");
const jwtSecret = "ysGgWQ07C8WGOizHhWCd";
module.exports = {
    createrUser: async function (req, res) {
        try {
            var email = req.body.email;
            var password = req.body.password;
            const emailExists = await Admin.emailExists(email);
            if (emailExists) {
                throw 1;
            } else {
                await Admin.createUser(
                    email,
                    password,
                );
                return res.status(200).send({
                    success: true,
                    message: 'Admin created.',
                });
            }
        } catch (err) {
            console.log(err)
            var msg;
            switch (err) {
                case 1:
                    msg = "User Exist";
                default:
                    msg = "Something wen wrong"
                    Event.emit("new::log", err.stack);
            }
            return res.status(400).send({
                success: false,
                message: msg,
            });
        }
    },
    login: async function (req, res) {
        try {
            const {
                email,
                password
            } = req.body;
            if (email == null) {
                throw 1;
            }
            if (password == null) {
                throw 2;
            }
            var check_user_exist = await Admin.findOne({
                email: email
            });
            if (check_user_exist == null) {
                throw 4;
            }
            const {
                status,
                user
            } = await Admin.checkPassword(email, password);
            //update language
            if (!status) {
                throw 3;
            }
            const accessToken = jwt.sign({
                email: email
            }, jwtSecret, {
                expiresIn: 31536e3
                // expiresIn: 20160
            });

            return res.status(200).json({
                success: true,
                message: "Login successfully",
                accessToken: accessToken
            });
        } catch (err) {
            console.log(err)
            var msg;
            switch (err) {
                case 1:
                    msg = "Please pass email";
                case 2:
                    msg = "Please pass password";
                case 3:
                    msg = "Password not match";
                case 4:
                    msg = "User not found";
                default:
                    msg = "Something wen wrong"
                    Event.emit("new::log", err.stack);
            }
            return res.status(400).send({
                success: false,
                message: msg,
            });
        }
    }
}