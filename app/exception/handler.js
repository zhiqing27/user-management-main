'use strict'

const Fs = require('fs');
const Moment = require('moment');

let Handler = {
    handle: async function(err, req, res, next){
        const path = "./logs/"+Moment().format("YYYY-MM-DD")+".txt";
        Fs.appendFile(path, Moment().format("HH:mm:ss") + " - "  + err + "\r\n", function(err){
            if(err){
                console.log(err);
                throw err;
            }
        });
        return res.status(502).send();
    }
}

module.exports = Handler