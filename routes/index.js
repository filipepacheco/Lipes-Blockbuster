let express = require('express');
let router = express.Router();

let Movie = require('../models/movie');
let User = require('../models/user');

const { check, validationResult } = require('express-validator');

router.get('/', (req, res) => {
    res.send("Welcome to Lipe's Blockbuster!");
});

router.get('/movies', (req, res) => {
    Movie.getAll(function (result, err) {
        res.send(err);
    });
});

router.get('/movie/:id', (req, res) => {
    Movie.getById(req.params.id, function (err, result) {
        res.send(result);
    });
});

router.get('/movies/search/:name', (req, res) => {
    Movie.getByName(req.params.name, function (err, result) {
        res.send(result);
    });
});


router.post('/movie', (req, res) => {
    let movie = new Movie(req.body);
    Movie.create(movie, function (err, result) {
        if(err){
            res.send(err);
        }else{
            res.send([result]);
        }
    });
});


router.post('/user', [
    check('email').isEmail(),
    check('birthday').isISO8601(),
    check('amount_leased').isNumeric(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.sendStatus(422).json({ errors: errors.array() });

    let user = new User(req.body);
    res.send(user);
});


module.exports = router;


