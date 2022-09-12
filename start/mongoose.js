'use strict'

const Mongoose = require('mongoose');
var MongooseConnect = function(){
    var db = null;

    function get(){
        try{
            if(db != null){
                return db;
            }else{
                db = Mongoose.createConnection(process.env.MY_DB, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    dbName: process.env.DB
                });
                //check connection
                db.on('connected', function (err) {
                    if (err) {
                        console.log('connect database failed:' + err);
                    }
                });
                return db;
            }
        }catch(err){
            return err;
        }
    }

    function reset(){
        db = Mongoose.createConnection(process.env.TRACE_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
            dbName: process.env.TRACE_DB
        });

        //check connection
        db.on('connected', function (err) {
            if (err) {
                console.log('connect database failed:' + err);
                reset();
            }
        });
    }

    return {
        get: get,
        reset: reset
    }
}

module.exports = MongooseConnect();