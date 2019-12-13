'use strict';
const db = require('../db/mysql');

let Director = (director) => {
    this.id = director.id;
    this.name = director.name;
    this.nickname = director.nickname;
    this.birthday = new Date(director.birthday);
};

Director.getAll = (cb) => {
    db.connection.query("SELECT * FROM director", [], (err, res) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, res);
        }
    });
};

Director.getByName = (nome, cb) => {
    db.connection.query("SELECT * FROM director WHERE name LIKE ? ", ['%'+nome+'%'], (err, res) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, res);
        }
    });
};

Director.getById =  (id, cb) => {
    db.connection.query("SELECT * FROM director WHERE id = ? ", id,  (err, res) => {
        if (err) {
            console.log("error: ", err);
            cb(err, null);
        } else {
            cb(null, res);
        }
    });
};

Director.create = (director, cb) => {
    db.connection.query("INSERT INTO director SET ?", director, (err, res) => {

        if (err) {
            console.log("error: ", err);
            cb(err, null);
        } else {
            console.log(res.insertId);
            cb(null, res.insertId);
        }
    });
};


Director.updateById = (director, cb) => {
    db.query("UPDATE director SET ? WHERE id = ?", [director, director.id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            cb(null, err);
        } else {
            cb(null, res);
        }
    });
};

Director.remove = (id, cb) => {
    db.query("DELETE FROM director WHERE id = ?", [id], (err, res) => {

        if (err) {
            console.log("error: ", err);
            cb(null, err);
        } else {
            cb(null, res);
        }
    });
};

module.exports = Director;
