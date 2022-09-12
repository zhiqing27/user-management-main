const Event = require('../../start/events');
const User = require('../models/User');
module.exports = {
    createrUser: async function (req, res) {
        try {
            var {
                email,
                phone_number,
                username,
                skillset,
                hobby
            } = req.body;
            // check user email exist
            if (typeof email == "undefined") {
                throw 1;
            }
            if (typeof phone_number == "undefined") {
                throw 2;
            }
            if (typeof username == "undefined") {
                throw 3;
            }
            const emailExists = await User.emailExists(email);
            if (emailExists) {
                throw 4;
            }
            const userNameExists = await User.userNameExists(username);
            if (userNameExists) {
                throw 5;
            }
            await User.createUser(
                email,
                username,
                phone_number,
                skillset,
                hobby
            );
            return res.status(200).send({
                success: true,
                message: 'User created successfully.',
            });
        } catch (err) {
            var msg;
            switch (err) {
                case 1:
                    msg = "Please pass email";
                case 2:
                    msg = "Please pass phone number";
                case 3:
                    msg = "Please pass username";
                case 4:
                    msg = "Email Exist";
                case 5:
                    msg = "Username exist";
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
    updateUser: async function (req, res) {
        try {
            var {
                _id,
                email,
                phone_number,
                username,
                skillset,
                hobby
            } = req.body;
            // check user email exist
            if (typeof email == "undefined") {
                throw 1;
            }
            if (typeof phone_number == "undefined") {
                throw 2;
            }
            if (typeof username == "undefined") {
                throw 3;
            }
           await User.findByIdAndUpdate(_id,{
                $set:{
                    phone_number:phone_number,
                    username:username,
                    skillset:skillset,
                    hobby:hobby
                }
            })
            return res.status(200).send({
                success: true,
                message: 'User updated successfully.',
            });
        } catch (err) {
            var msg;
            switch (err) {
                case 1:
                    msg = "Please pass email";
                case 2:
                    msg = "Please pass phone number";
                case 3:
                    msg = "Please pass username";
                case 4:
                    msg = "Email Exist";
                case 5:
                    msg = "Username exist";
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
    deleteUser: async function (req, res) {
        try {
            var {
                _id,
            } = req.body;
            // check user email exist
           await User.findByIdAndRemove(_id);
           return res.status(200).send({
            success: true,
            message: 'User Deleted.',
        });
        } catch (err) {
            console.log(err);
            var msg;
            switch (err) {
                case 1:
                    msg = "Please pass email";
                case 2:
                    msg = "Please pass phone number";
                case 3:
                    msg = "Please pass username";
                case 4:
                    msg = "Email Exist";
                case 5:
                    msg = "Username exist";
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
    getUser: async function (req, res) {
        try {
            var user;
            var id=req.query.id;
            if(typeof id=="undefined"){
                user= await User.find({});
            }else{
                user=await User.findOne({"_id":id});
            }
            return res.status(200).send({
                success: true,
                result: user,
            });
        } catch (err) {
            var msg;
            switch (err) {
                case 1:
                    msg = "Please pass email";
                case 2:
                    msg = "Please pass phone number";
                case 3:
                    msg = "Please pass username";
                case 4:
                    msg = "Email Exist";
                case 5:
                    msg = "Username exist";
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
}