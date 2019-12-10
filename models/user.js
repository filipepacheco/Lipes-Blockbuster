'use strict';

//Filme object constructor
let User = function (user) {
    this.id            = user.id;
    this.name          = user.name;
    this.email         = user.email;
    this.password      = user.password;
    this.birthday      = new Date(user.birthday);
    this.gender        = user.gender;
    this.amount_leased = user.amount_leased;
};




module.exports = User;
