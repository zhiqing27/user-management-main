'use strict';
var http = require('http');
const eventEmitter = require('eventemitter2');
const Fs= require("fs");
var Event = new eventEmitter(require('../config/event'));
const Moment = require('moment');

Event.on("new::log", function (error) {
    const path = "./logs/" + Moment().format("YYYY-MM-DD") + ".txt";
    try {
        Fs.appendFile(path, Moment().format("HH:mm:ss") + " - " + error + "\r\n", function (err) {
            if (err) {
                throw err;
            }
        })
    } catch (errr) {
        Fs.appendFile(path, Moment().format("HH:mm:ss") + " - " + errr + "\r\n", function (errr) {
            if (errr) {
                console.log(errr);
            }
        })
    }
});

module.exports = Event;