const db = require('../common/connectdb')

const User = function(user) {
    this.id = user.id;
    this.username = user.username;
    this.password = user.password;
    this.display_name = user.display_name;
    this.phone = user.phone;
    this.email = user.email;
    this.create_date = user.create_date;
    this.role = this.role;
}

User.GetUser = function(data, result) {
    db.query(`SELECT * FROM users WHERE username='${data}'`, function(err, user) {
        if(err) {
            result({err: "User not found!"})
        }else{
            result(user[0])
        }
    })
}
User.create = function(newData, result) {
    db.query("INSERT INTO users SET ?", newData, function(err, user) {
        if (err) {
            result(null);
        }else{
            result({id: user.insertId, message: "Create Success!"});
        }
    })
}
module.exports = User;