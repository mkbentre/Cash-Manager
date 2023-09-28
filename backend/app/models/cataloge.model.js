const db = require('../common/connectdb')

const Cataloge = function(cataloge) {
    this.id         = cataloge.id,
    this.user_id    = cataloge.user_id
    this.parent_id  = cataloge.parent_id,
    this.name       = cataloge.name,
    this.type       = cataloge.type
}

Cataloge.GetAll = function(result) {
    db.query(`SELECT * FROM cataloges`, function(err, cataloge) {
        if(err) {
            result({err: "Get Fail"})
        }else{
            result({cataloge})
        }
    })
}

Cataloge.Create = function(data, result) {
    db.query(`INSERT INTO cataloges SET ?`, data, function(err, cataloge) {
        if(err) {
            result({code: '50', desc: 'Create faill!', data: null})
        }else{
            result({code: '00', desc: 'Create Success!', data: cataloge.insertId})
        }
    })
}

Cataloge.Update = function(data, result) {
    // 
}

Cataloge.Delete = function(data, result) {
    db.query(`DELETE FROM cataloges WHERE id=${data}`, function(err, cataloge) {
        if(err) {
            result({err: "Delete Fail"})
        }
        if(cataloge.affectedRows == 0){
            result({err: "ID not Found"})
        }else{
            result({data: "ID " + data + " Deleted"})
        }
    })
}

Cataloge.CheckExistName = function(data, result) {
    db.query(`SELECT * FROM cataloges WHERE name='${data}'`, function(err, e){
        if(err || e.length == 0) {
            result({exist: 0})
        }else{
            result({exist: 1})
        }
    })
}
module.exports = Cataloge