'use strict';
const db = require('../db/mysql');

let Movie = (filme) => {
    this.id = filme.id;
    this.name = filme.name;
    this.id_director = filme.id_director;
    this.id_genre = filme.id_genre;
    this.date_release = new Date(filme.date_release);
    this.synopsis = filme.synopsis;
    this.rating = filme.rating;
};

Movie.getAll = (result) => {
    db.connection.query("SELECT * FROM movie", [], (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Movie.getByName = (nome, result) => {
    db.connection.query("SELECT * FROM movie WHERE name LIKE ? ", ['%'+nome+'%'], (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Movie.getById =  (id, result) => {
    db.connection.query("SELECT * FROM movie WHERE id = ? ", id,  (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Movie.create = (movie, result) => {
    db.connection.query("INSERT INTO movie SET ?", movie, (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};


Movie.updateById = (movie, result) => {
    db.query("UPDATE movie SET ? WHERE id = ?", [movie, movie.id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Movie.remove = (id, result) => {
    db.query("DELETE FROM movie WHERE id = ?", [id], (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

module.exports = Movie;
