var User = require('../models/user.model');
var HashPW = require('../common/HashPassword');
const JWT = require('../common/JWT');

exports.checkUser = function (req, res) {
    if (req.body.username && req.body.password) {
        User.GetUser(req.body.username, async function (response) {
            var data = {}
            data.password = req.body.password
            data.hash = response.password
            let check = await HashPW.check_hash(data)
            var data_token = {}
            data_token.id = response.id
            data_token.role = response.role
            if (check) {
                const _token = await JWT.make(data_token);
                res.send({ code: '00', desc: 'Welcome back: ' + response.display_name, data: _token });
            } else {
                res.send({ code: '40', desc: "Wrong Email or Password", data: null })
            }
        })
    } else {
        res.send({ code: '40', desc: "Login Invalid!", data: null })
    }
}