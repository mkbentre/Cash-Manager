const db = require('../common/connectdb')

const Transaction = function(transaction) {
    this.id         = transaction.id
    this.user_id    = transaction.id
    this.wallet_id  = transaction.wallet_id
    this.cataloge_id = transaction.cataloge_id
    this.note       = transaction.note
    this.type       = transaction.type
    this.date       = transaction.date
}