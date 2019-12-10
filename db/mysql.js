const mysql = require('mysql');
const CONFIG = require('../config');
const dbConfig = {
    host:     CONFIG.DB_HOST,
    port:     CONFIG.DB_PORT,
    user:     CONFIG.DB_USER,
    password: CONFIG.DB_PASS,
    database: CONFIG.DB_DATABASE,
};

const connection = mysql.createConnection(dbConfig);
connection.connect(function (err) {
    if (err) return console.log(err);
});

module.exports = {
    'connection': connection,
    'asyncConnection': async () => new Promise(
        (resolve, reject) => {
            const connection = mysql.createConnection(dbConfig);
            connection.connect(error => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(connection);
            })
        }),
    'asycQuery': async (conn, q, params) => new Promise(
        (resolve, reject) => {
            const handler = (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            };
            conn.query(q, params, handler);
        })
};
