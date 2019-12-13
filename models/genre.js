'use strict';
const db = require('../db/mysql');

let Genre = (genre) => {
    this.id = genre.id;
    this.name = genre.name;
};

Genre.getAll = (result) => {
    db.connection.query("SELECT * FROM genre", [], (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Genre.getByName = (nome, result) => {
    db.connection.query("SELECT * FROM genre WHERE name LIKE ? ", ['%'+nome+'%'], (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Genre.getById =  (id, result) => {
    db.connection.query("SELECT * FROM genre WHERE id = ? ", id,  (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Genre.create = (genre, result) => {
    db.connection.query("INSERT INTO genre SET ?", genre, (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};


Genre.updateById = (genre, result) => {
    db.query("UPDATE genre SET ? WHERE id = ?", [genre, genre.id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Genre.remove = (id, result) => {
    db.query("DELETE FROM genre WHERE id = ?", [id], (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

module.exports = Genre;
