const bcrypt = require('bcrypt');
const saltRounds = 10;

let Hash = function(req, res) {
    var myPlaintextPassword = req
    hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
    return hash
}


let check_hash = function(req, res) {
    var myPlaintextPassword = req.password;
    var hash = req.hash;
    check = bcrypt.compareSync(myPlaintextPassword, hash);
    return check;
}

module.exports = {
    Hash: Hash,
    check_hash: check_hash,
}