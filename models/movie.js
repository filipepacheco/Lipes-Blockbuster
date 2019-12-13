'use strict';
const db = require('../db/mysql');
const DateDiff = require('date-diff');

let User = require("./user");
let Movie_Copy = require("./movie_copy");

let Movie = filme => {
    this.id = filme.id;
    this.name = filme.name;
    this.id_director = filme.id_director;
    this.id_genre = filme.id_genre;
    this.date_release = new Date(filme.date_release);
    this.synopsis = filme.synopsis;
    this.rating = filme.rating;
};

Movie.getAll = cb => {
    db.connection.query("SELECT * FROM movie", [], (err, res) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, res);
        }
    });
};

Movie.getByParam = (param, value, cb) => {
    db.connection.query("SELECT * FROM movie WHERE ?? LIKE ? ", [param, '%' + value + '%'], (err, res) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, res);
        }
    });
};

Movie.getByName = (name, cb) => {
    db.connection.query("SELECT * FROM movie WHERE name LIKE ? ", ['%' + name + '%'], (err, res) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, res);
        }
    });
};

Movie.getById = (id, cb) => {
    db.connection.query("SELECT * FROM movie WHERE id = ? ", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            cb(err, null);
        } else {
            cb(null, res);
        }
    });
};

Movie.create = (movie, cb) => {
    db.connection.query("INSERT INTO movie SET ? ", movie, (err, res) => {

        if (err) {
            console.log("error: ", err);
            cb(err, null);
        } else {
            Movie_Copy.create(5, res.insertId).then(cb(null, res));
        }
    });
};

Movie.rent = (userInfo, movieId, cb) => {

    User.getById(userInfo.id, (err, user) => {
        if (err) return cb(err);

        let idade = new DateDiff(new Date(), new Date(user[0].birthday)).years();

        Movie.getById(movieId, (err, res) => {
            if (err) return cb(err);
            let mov = res[0];

            if (idade < mov.rating) return cb(userInfo.name +" não possui idade para alugar " + mov.name + ". Classificação é de " + mov.rating + " anos.");

            Movie_Copy.getAvailability(mov.id).then(
                (res) => {

                    if (res.available === true) {
                        Movie_Copy.rent(res.idCopyAvailable, user[0].id, (err, data) => {
                            if (err) return cb(err);

                            return cb(null, data)
                        });
                    } else {
                        if (res.dateAvailable === null)
                            return cb("Nenhum exemplar de " + mov.name + " cadastrado!");

                        return cb("Todos os exemplares de " + mov.name + " estão alugados! Você pode retirar ele a partir de: " + res.dateAvailable.toLocaleString())
                    }
                });
        });
    });
};

Movie.updateById = (movie, cb) => {
    db.query("UPDATE movie SET ? WHERE id = ?", [movie, movie.id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            cb(null, err);
        } else {
            cb(null, res);
        }
    });
};

Movie.remove = (id, cb) => {
    db.query("DELETE FROM movie WHERE id = ?", [id], (err, res) => {

        if (err) {
            console.log("error: ", err);
            cb(null, err);
        } else {
            cb(null, res);
        }
    });
};

module.exports = Movie;
