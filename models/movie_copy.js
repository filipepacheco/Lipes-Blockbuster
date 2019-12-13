'use strict';

const db = require('../db/mysql');
const { asycQuery } = require('../db/mysql');

let Movie_Copy = (copia) => {
    this.id             = copia.id;
    this.id_movie       = copia.id_movie;
    this.leased         = copia.leased;
    this.id_user_leased = copia.id_user_leased;
    this.leased_until   = new Date(copia.leased_until);
    this.leased_when    = new Date(copia.leased_when);
};

Movie_Copy.create = async (amount, movie_id) => {
    let ret;
    for (let i = 0; i < amount; i++){
        ret = await asycQuery(db.connection, "INSERT INTO movie_copy SET ? ;", [{id_movie: movie_id}]);
    }
}

Movie_Copy.getAll = (cb) => {
    db.connection.query("SELECT * FROM movie_copy", [], (err, res) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, res);
        }
    });
};

Movie_Copy.getAllLeased = (cb) => {
    db.connection.query("SELECT * FROM movie_copy WHERE COALESCE(leased_until, now()) > now()", [], (err, res) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, res);
        }
    });
};

Movie_Copy.getById = (id, cb) => {
    db.connection.query("SELECT * FROM movie_copy WHERE id = ? ", id,  (err, res) => {
        if (err) {
            console.log("error: ", err);
            cb(err, null);
        } else {
            cb(null, res);
        }
    });
};

Movie_Copy.returnCopy = async (user, copy) => {
    var ret = [];
    if(copy.id_movie !== undefined){
        ret = await asycQuery(db.connection, "UPDATE movie_copy SET leased_until  = now() WHERE id_user_leased = ? and id_movie = ? ", [user.id, copy.id_movie]);
    }

    if(copy.id !== undefined){
        ret = await asycQuery(db.connection, "UPDATE movie_copy SET leased_until  = now() WHERE id_user_leased = ? and id = ? ", [user.id, copy.id]);
    }

    return ret;
};

Movie_Copy.getByIdUser = (idUser, cb) => {
    db.connection.query("SELECT * FROM movie_copy WHERE id_user_leased = ? AND COALESCE(leased_until, now()) > now() ", idUser,  (err, res) => {
        if (err) {
            console.log("error: ", err);
            cb(err, null);
        } else {
            cb(null, res);
        }
    });
};

Movie_Copy.getByIdMovie = (id, cb) => {
    db.connection.query("SELECT * FROM movie_copy WHERE id_movie = ? ", id,  (err, res) => {
        if (err) {
            console.log("error: ", err);
            cb(err, null);
        } else {
            cb(null, res);
        }
    });
};

Movie_Copy.getAvailability = async (id) => {
    let availableCopies = await asycQuery(db.connection, "SELECT * FROM movie_copy WHERE id_movie = ? AND COALESCE(leased_until, now()) <= now()", [id]);

    if(availableCopies.length > 0)
        return {
            available: true,
            dateAvailable: null,
            idCopyAvailable: availableCopies[0].id
        };

    let leasedCopies = await asycQuery(db.connection, "SELECT * FROM movie_copy WHERE id_movie = ? AND leased_until > now() ORDER BY leased_until DESC LIMIT 1", [id]);

    if(leasedCopies.length === 0)
        return {
            available: false,
            dateAvailable: null,
            idCopyAvailable: 0
        };

    return {
        available: false,
        dateAvailable: new Date(leasedCopies[0].leased_until),
        idCopyAvailable: 0
    };
};


Movie_Copy.updateById = (movieCopy, cb) => {
    db.connection.query("UPDATE movie_copy SET ? WHERE id = ?", [movieCopy, movieCopy.id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            cb(null, err);
        } else {
            cb(null, res);
        }
    });
};


Movie_Copy.rent = (idCopy, idUser, cb) => {
    let today = new Date();
    let weekAfter = new Date(new Date().setTime( new Date().getTime() + 7 * 86400000 ));

    let copy = {
        id: idCopy,
        id_user_leased: idUser,
        leased: 1,
        leased_when: today,
        leased_until: weekAfter
    };

    Movie_Copy.updateById(copy, (err, res) => {
        cb(err, {
            leased_until: weekAfter,
            res
        });
    })
};

Movie_Copy.getAvailablesByIdMovie = (id, cb) => {
    db.connection.query("SELECT * FROM movie_copy WHERE id_movie = ? AND coalesce(leased, 0) <> 1 ", id,  (err, res) => {
        if (err) {
            console.log("error: ", err);
            cb(err, null);
        } else {
            cb(null, res);
        }
    });
};

module.exports = Movie_Copy;
