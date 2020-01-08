var DataStore = require('nedb');
var DB = new DataStore();


const insert = (data) => {
    return new Promise((resolve, reject) => {
        DB.insert(data, (err, doc) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(doc);
            }
        });
    });
}

const find = (query = {}) => {

    return new Promise((resolve, reject) => {
        DB.find(query, (err, doc) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(doc);
            }
        });
    });
}

const findOne = (query) => {
    console.log('query', query);

    return new Promise((resolve, reject) => {
        DB.findOne(query, (err, doc) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(doc);
            }
        });
    });
}

const eraseAll = () => {

    return new Promise((resolve, reject) => {
        DB.remove({}, { multi: true }, (err, doc) => {
            if (err) {
                reject(err);
            }
            else {
                resolve({ status: true });
            }
        });
    });
}

const update = (query, updateQuery) => {

    return new Promise((resolve, reject) => {
        DB.update(query, updateQuery, (err, doc) => {
            if (err) {
                reject(err);
            }
            else {
                resolve({ status: true });
            }
        });
    });
}

module.exports = { insert, find, findOne, eraseAll, update };