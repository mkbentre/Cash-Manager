const db = require('../common/connectdb')

const Transaction = function(transaction) {
    this.id         = transaction.id
    this.user_id    = transaction.id
    this.wallet_id  = transaction.wallet_id
    this.cataloge_id = transaction.cataloge_id
    this.cash       = transaction.cash
    this.note       = transaction.note
    this.type       = transaction.type
    this.date       = transaction.date
}

Transaction.Create = function(data, result) {
    
    db.query(`INSERT INTO transaction (id, user_id, wallet_id, cataloge_id, cash, note, type, date) VALUES (NULL, '${data.user_id}', '${data.wallet_id}', '${data.cataloge_id}', '${data.cash}', '${data.note}', '${data.type}', CURRENT_TIME())`, function(err, transaction) {
        if(err) {
            result({code: '50', data: null})
        }else{
            result({code: '00', insertId: transaction.insertId})
        }
    })
}

Transaction.DeleteByWallet = function(data, result) {
    db.query(`DELETE FROM transaction WHERE wallet_id=${data}`, function(err, transaction) {
        if(err) {
            result({ code: '50', data: null })
        }else{
            result({ code: '00', data: transaction })
        }
    })
}
module.exports = Transaction