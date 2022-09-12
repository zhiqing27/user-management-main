const bypass = ["create", "login"];
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const jwtSecret = "ysGgWQ07C8WGOizHhWCd";
let TokenVerification = {
    handle: async function (req, res, next) {
        try {
            var path = req.path.split("/");
            if (bypass.includes(path[1]) || typeof path[1] === 'undefined') {
                return next();
            } else {
              
                let token = req.headers.auth || req.query.token;
                if (token == null || token == undefined) {
                    throw 1;
                }
                if (token && token.split(" ")[0] === "Bearer") {
                    token = token.split(" ")[1];
                } else {
                    token = token;
                }
                let decoded = jwt.verify(token, jwtSecret);
                let check_user = await Admin.findOne({
                    email: decoded.email,
                });
                if (check_user == null) {
                    throw 2;
                }
                next();
            }
        } catch (err) {
            var msg;
            switch (err) {
                case 1:
                    msg = "Token not passed";
                case 2:
                    msg = "Admin Not Found";
                default:
                    msg = "Unauthorized";
            }
            return res.status(401).send({
                success: false,
                message: msg,
            });
        }
    }
}
module.exports = TokenVerification;