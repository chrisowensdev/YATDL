'use strict';

const host = 'lallah.db.elephantsql.com';
const database = 'wakqmedy';
const user = 'wakqmedy';
const password = 'tc7c8Kw4nutE1x4T5MCzCwXtgfX384kr';

const pgp = require('pg-promise')({
    query: function (event) {
        console.log("QUERY: ", event.query);
    }
})

const options = {
    host: host,
    database: database,
    user: user,
    password: password
};

const db = pgp(options);

module.exports = db;