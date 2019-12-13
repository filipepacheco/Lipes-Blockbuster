const jwt = require("jsonwebtoken");
const CONFIG = require('../config');

let authLogin = (req, res, next) => validarJWT(req, res, next);
let authLoginAdmin = (req, res, next) => validarJWT(req, res, next, true);

let validarJWT = (req, res, next, admin = false) => {
    let token = req.headers['authorization'];
    if (!token) return res.status(401).send({auth: false, message: 'Token não informado.'});
    token = token.replace("Bearer ", "");

    jwt.verify(token, CONFIG.SECRET_JWT, function (err, decoded) {
        if (err) return res.status(500).send({
            success: false,
            message: 'Falha em autenticar token!',
            details: "",
            errors: err
        });

        if (admin && !decoded.admin) return res.status(500).send({
            success: false,
            message: 'Apenas usuário administrador possui acesso.',
            details: {
                auth: false,
                token: null,
            },
            errors: null
        });
        req.user = decoded;
        next();
    });
};

let generateToken = (user) => {
    let token = jwt.sign({
        id      : user.id,
        name    : user.name,
        email   : user.email,
        admin   : user.admin,
        birthday: user.birthday
    }, CONFIG.SECRET_JWT, {
        expiresIn: 3600
    });
    return {auth: true, token: token};
};

let logout = () => {
    return {auth: false, token: ""};
};

module.exports = {authLogin, authLoginAdmin, generateToken, logout};
