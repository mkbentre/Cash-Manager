var User = require('../models/user.model');
var HashPW = require('../common/HashPassword');
const JWT = require('../common/JWT');

exports.checkUser = function(req, res) {
    if(req.body.username && req.body.password) {
        User.GetUser(req.body.username, async function(response) {
            var data = {}
            data.password = req.body.password
            data.hash = response.password
            let check = await HashPW.check_hash(data)
            var data_token = {}
            data_token.id = response.id
            data_token.role = response.role
            if (check) {
                const _token = await JWT.make(data_token);
                res.send({message: 'Welcome back: ' + response.display_name,token: _token});
            }else{
                res.send({result: "Wrong Email or Password"})
            }
        })
    }else{
        res.send({result: "Login Invalid!"})
    }
}