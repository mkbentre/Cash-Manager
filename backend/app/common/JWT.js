const jwt = require('jsonwebtoken')
let make = function(user) {
    return new Promise(function(reslove, reject) {
        jwt.sign({data: user}, process.env.SECRETKEY, {
            algorithm: "HS256",
            expiresIn: process.env.TOKEN_TIME_LIFE
        },
        function(err, _token) {
            if (err) {
                return reject(err);
            }
            return reslove(_token);
        }
        );
    });
}

let check = function(token) {
    return new Promise((reslove, reject) => {
        jwt.verify(token, process.env.SECRETKEY, function(err, data) {
            if(err) {return reject(err)}
            return reslove(data);
        });
    })
}

module.exports = {
    make: make,
    check: check,
}