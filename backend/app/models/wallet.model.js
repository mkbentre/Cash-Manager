const db = require('../common/connectdb')

const Wallet = function(wallet) {
    this.id = wallet.id,
    this.user_id = wallet.user_id,
    this.wallet_name = wallet.wallet_name,
    this.currency = wallet.currency
}

Wallet.CheckQtyWallet = function(data, result) {
    db.query(`SELECT COUNT(user_id) as qty FROM wallets WHERE user_id = '${data}'`, function(err, Qty) {
        if(err) {
            result({err: err})
        }else{
            result({err: qty})
        }
    })
    
}

Wallet.Create = function(data, result) {
    db.query('INSERT INTO wallets SET ?', data, function(err, wallet) {
        if(err) {
            result({err: "Create Fail"})
        }else{
            result({id: wallet.insertId, message: "Create Success!"})
        }
    })
}

Wallet.Delete = function(data, result) {
    db.query(`DELETE FROM wallets WHERE id=${data}`, function(err, wallet) {
        if(err) {
            result({code: '50'})
        }
        if(wallet.affectedRows == 0){
            result({code: '40'})
        }else{
            result({code: '00', id: data})
        }
    })
}

Wallet.Update = function(data, result) {
    // 
}
module.exports = Wallet