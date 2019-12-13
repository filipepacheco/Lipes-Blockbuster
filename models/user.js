'use strict';
const db = require('../db/mysql');
const bcrypt = require('bcrypt');
const CONFIG = require('../config');


let User = function (user) {
    this.id            = user.id;
    this.name          = user.name;
    this.email         = user.email;
    this.password      = user.password;
    this.birthday      = new Date(user.birthday);
    this.gender        = user.gender;
    this.amount_leased = user.amount_leased;
    this.admin         = user.admin;
};

User.login = function(user, cb) {
    db.connection.query("SELECT * FROM user WHERE email = ?", [user.email], (err, res) => {
        if (err) {
            cb(err, null);
        } else {
            if (bcrypt.compareSync(user.password, res[0].password)) {
                cb(null, res)
            } else {
                cb({erro: 'senha invalida'}, res);
            }
        }
    });
};

User.getAll = (cb) => {
    db.connection.query("SELECT * FROM user", [], (err, res) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, res);
        }
    });
};

User.getByName = (nome, cb) => {
    db.connection.query("SELECT * FROM user WHERE name LIKE ? ", ['%'+nome+'%'], (err, res) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, res);
        }
    });
};

User.getByEmail = (email, cb) => {
    db.connection.query("SELECT * FROM user WHERE email = ? ", ['%'+email+'%'], (err, res) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, res);
        }
    });
};

User.getById =  (id, cb) => {
    db.connection.query("SELECT * FROM user WHERE id = ? ", id,  (err, res) => {
        if (err) {
            console.log("error: ", err);
            cb(err, null);
        } else {
            cb(null, res);
        }
    });
};

User.create = (user, cb) => {
    user.password = bcrypt.hashSync(user.password, CONFIG.BCRYPT_SALT);
    db.connection.query("INSERT INTO user SET ? ", user, (err, res) => {
        if (err) {
            console.log("error: ", err);
            cb(err, null);
        } else {
            cb(null, {id: res.insertId});
        }
    });
};


User.updateById = (user, cb) => {
    db.query("UPDATE user SET ? WHERE id = ?", [user, user.id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            cb(null, err);
        } else {
            cb(null, res);
        }
    });
};

User.remove = (id, cb) => {
    db.query("DELETE FROM user WHERE id = ?", [id], (err, res) => {

        if (err) {
            console.log("error: ", err);
            cb(null, err);
        } else {
            cb(null, res);
        }
    });
};



module.exports = User;
