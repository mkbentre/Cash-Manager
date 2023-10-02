let isAuth = async function (req, res, next) {
    var _JWT = require('../common/JWT')
    var _token = req.headers.authorization
    if (_token) {
        try {
            var authData = await _JWT.check(_token);
            req.auth = authData;
            next();
        } catch (error) {
            return res.send({ code: '40', desc: "Token invalid!", data: null })
        }
    } else {
        return res.send({ code: '43', desc: "Token not found!", data: null })
    }
}

module.exports = {
    isAuth: isAuth
}