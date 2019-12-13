const express = require('express');
const router = express.Router();
const {check, validationResult, body} = require('express-validator');
const {authLogin, authLoginAdmin, generateToken, logout} = require('../middleware/auth');

let Movie = require('../models/movie');
let Movie_Copy = require('../models/movie_copy');
let Director = require('../models/director');
let Genre = require('../models/genre');
let User = require('../models/user');

router.get('/', (req, res) => {
    res.send("Welcome to Lipe's Blockbuster!");
});

// MOVIE

// GET
router.get('/movies', (req, res) => {
    Movie.getAll(function (err, result) {
        if(err) return res.status(500).send({
            success: true,
            message: "Erro ao buscar lista de filmes",
            details: "",
            errors: err
        });
        res.send({
            success: true,
            message: "Lista de filmes buscada com sucesso.",
            details: result,
            errors: []
        });
    });
});

router.get('/movie/:id', (req, res) => {
    Movie.getById(req.params.id, function (err, result) {
        if(err) return res.status(500).send({
            success: true,
            message: "Erro ao buscar lista de filmes",
            details: "",
            errors: err
        });
        res.send({
            success: true,
            message: "Lista de filmes buscada com sucesso.",
            details: result,
            errors: []
        });
    });
});

router.get('/movies/search/:param/:name', (req, res) => {
    Movie.getByParam(req.params.param, req.params.name, function (err, result) {
        res.send(result);
    });
});

router.get('/movies/search/:name', (req, res) => {
    Movie.getByName(req.params.name, function (err, result) {
        if(err) return res.send({
            success: true,
            message: "Erro ao buscar lista de filmes",
            details: "",
            errors: err
        });
        res.send({
            success: true,
            message: "Lista de filmes buscada com sucesso.",
            details: result,
            errors: []
        });
    });
});

// POST
router.post('/movie', authLoginAdmin, [
    check('id_director', "ID de diretor inválido. Utilize o GET Director para buscar a lista de diretores. ").isNumeric(),
    check('id_genre', "ID de gênero inválido. Utilize o GET Genre para buscar a lista de gêneros. ").isNumeric(),
    check('date_release', "Data de lançamento deve ser no formato ISO8601").isISO8601(),
    check('rating', "Classificação indicativa deve ser numérica.").isNumeric()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({errors: errors.array()});

    Movie.create(req.body, function (err, result) {
        if (err) return res.status(500).send({
            success: false,
            message: "Erro ao cadastrar novo filme.",
            details: "",
            errors: err
        });
        res.send({
            success: true,
            message: "Filme cadastrado com sucesso.",
            details: result,
            errors: []
        });
    });
});


// DIRECTOR

// GET
router.get('/directors', (req, res) => {
    Director.getAll(function (result, err) {
        res.send(err);
    });
});

router.get('/director/:id', (req, res) => {
    Director.getById(req.params.id, function (err, result) {
        res.send(result);
    });
});

router.get('/directors/search/:name', (req, res) => {
    Director.getByName(req.params.name, function (err, result) {
        res.send(result);
    });
});

// GENRE

// GET
router.get('/genres', (req, res) => {
    Genre.getAll(function (result, err) {
        res.send(err);
    });
});

router.get('/genre/:id', (req, res) => {
    Genre.getById(req.params.id, function (err, result) {
        res.send(result);
    });
});

router.get('/genres/search/:name', (req, res) => {
    Genre.getByName(req.params.name, function (err, result) {
        res.send(result);
    });
});

// USER

// GET

router.get('/user/:id', authLoginAdmin, (req, res) => {
    User.getById(req.params.id, function (err, result) {
        res.send(result);
    });
});

router.get('/users/search/:name', authLoginAdmin, (req, res) => {
    User.getByName(req.params.name, function (err, result) {
        res.send(result);
    });
});

router.get('/users', authLoginAdmin, (req, res) => {
    User.getAll(function (result, err) {
        res.send(err);
    });
});

// POST

router.post('/user', [
    body('email').isEmail().withMessage('E-mail deve estar formatado (nome@provedor.com)'),
    body('birthday').isISO8601().withMessage("Aniversário deve ser em formato ISO8601"),
    body('name').exists().withMessage("Nome não informado")
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({
        success: false,
        message: "",
        details: "Erro com os parametros recebidos.",
        errors: errors.array()
    });

    let user = new User(req.body);
    User.create(user, (err, result) => {
        if (err) return res.status(500).json({errors: err});

        res.send({
            success: true,
            message: "Usuário "+user.name+" incluído com sucesso.",
            details: result,
            errors: []
        });
    });
});


// RENT

// POST

router.post('/rent', authLogin, [
    check("id_movie").isInt().withMessage("Id do filme deve ser um int.")
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({errors: errors.array()});

    Movie.rent(req.user, req.body.id_movie, (err, result) => {
        if(err) return res.status(500).send({
            success: false,
            message: "Erro ao alugar filme.",
            details: "",
            errors: err
        });

        res.send({
            success: true,
            message: "Filme alugado com sucesso.",
            details: result,
            errors: []
        });
    })
});

router.post('/rent/return', authLogin, (req, res) => {
    Movie_Copy.returnCopy(req.user, req.body).then(result => {
        res.send({
            success: true,
            message: result.changedRows + " exemplares devolvidos.",
            details: result,
            errors: []
        });
    })
});

// GET
router.get('/rents', authLoginAdmin, (req, res) => {
    Movie_Copy.getAllLeased( (err, result) => {
        res.send({
            success: true,
            message: result.length + " exemplares alugados.",
            details: result,
            errors: []
        })
    });
});

router.get('/rents/logged', authLogin, (req, res) => {
    Movie_Copy.getByIdUser(req.user.id, (err, result) => {
        res.send({
            success: true,
            message: result.length + " filmes alugados.",
            details: result,
            errors: []
        });
    });
});

router.get('/rent/:id', authLoginAdmin, (req, res) => {
    Movie_Copy.getByIdUser(req.params.id, (err, result) => {
        res.send(result);
    });
});

// LOGIN

// GET
router.get('/logged', authLogin, (req, res) => {
    User.getById(req.user.id, function (err, result) {
        res.send({
            success: true,
            message: "",
            details: result,
            errors: []
        });
    });
});

// POST
router.post('/login', (req, res) => {
    let user = new User(req.body);
    User.login(user, function (err, result) {
        if (err)
            return res.status(500).json({
                success: false,
                message: "Falha ao tentar efetuar login.",
                details: "",
                errors: err
            });

        let tokenAccess = generateToken(result[0]);
        res.status(200).send({
            success: true,
            message: "Login feito com sucesso.",
            details: tokenAccess,
            errors: []
        });
    });
});

// POST
router.post('/logout', authLogin, (req, res) => {
    res.status(200).send({
        success: true,
        message: "Logout feito com sucesso.",
        details: logout(),
        errors: []
    });
});


module.exports = router;


