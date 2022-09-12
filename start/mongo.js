'use strict'

const { MongoClient } = require('mongodb');
const MongoConfig = require("../config/database");

var MongoConnection = function(){
    var db = null;

    async function connection(){
        try{
            let url = MongoConfig.mongo.ultra.url;
            let _db = await MongoClient.connect(url,{
                bufferMaxEntries: 0,
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            return _db;
        }catch(err){
            return err;
        }
    }

    async function get(){
        try{
            if(db != null){
                return db;
            }else{
                db = await connection();
                return db;
            }
        }catch(err){
            return err;
        }
    }

    return {
        get: get
    }
}

module.exports = MongoConnection();