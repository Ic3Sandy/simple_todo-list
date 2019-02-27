'use strict';
const redis = require('redis');
const client = redis.createClient();

const setData = (key, value) => {

    return new Promise((resolve, reject) => {

        client.set(key, value, (err, reply) => {
            if (err) return console.log(err);
            else {
                console.log(reply);
                resolve();
            };
        });

    });
};

const getData = (key) => {
    client.get(key, (err, reply) => {
        if (err) return console.log(err);
        else console.log(reply);
    });
};

const delData = (key) => {

    return new Promise((resolve, reject) => {

        client.del(key, (err, reply) => {
            if (err) return console.log(err);
            else{
                console.log(reply);
                resolve();
            };
        });

    });
};

const getAll = () => {

    return new Promise((resolve, reject) => {

        client.keys('*', (err, keys) => {
            if (err) console.log(err);
            else resolve(keys);
        });

    });
};

const removeAll = () => {
    client.flushdb((err, succeeded) => {
        if (err) console.log(err);
        else console.log(succeeded);
    });
};

exports.setData = setData;
exports.getData = getData;
exports.delData = delData;
exports.getAll = getAll;
exports.removeAll = removeAll;
// removeAll();