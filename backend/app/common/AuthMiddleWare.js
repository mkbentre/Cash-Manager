let isAuth = async function(req, res, next) {
    var _JWT = require('../common/JWT')
    var _token = req.headers.authorization
    if(_token) {
        try {
            var authData = await _JWT.check(_token);
            req.auth = authData;
            next();
        } catch (error) {
            return res.send({data: "Token invalid!"})
        }
    }else{
        return res.send({data: "Token not found!"})
    }
}

module.exports = {
    isAuth: isAuth
}