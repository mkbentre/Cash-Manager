const db = require('../common/connectdb')

const Wallet = function (wallet) {
    this.id = wallet.id,
        this.user_id = wallet.user_id,
        this.wallet_name = wallet.wallet_name,
        this.currency = wallet.currency
}

Wallet.CheckQtyWallet = function (data, result) {
    db.query(`SELECT COUNT(user_id) as qty FROM wallets WHERE user_id = '${data}'`, function (err, qty) {
        if (err) {
            result({ code: 'er' })
        } else {
            result({ code: 'ss', data: qty[0] })

        }
    })

}

Wallet.Create = function (data, result) {
    db.query('INSERT INTO wallets SET ?', data, function (err, wallet) {
        if (err) {
            result({ err: "Create Fail" })
        } else {
            result({ id: wallet.insertId, message: "Create Success!" })
        }
    })
}

Wallet.Delete = function (data, result) {
    db.query(`DELETE FROM wallets WHERE id=${data}`, function (err, wallet) {
        if (err) {
            result({ code: '50' })
        }
        if (wallet.affectedRows == 0) {
            result({ code: '40' })
        } else {
            result({ code: '00', id: data })
        }
    })
}

Wallet.Update = function (data, result) {
    // 
}

Wallet.GetWalletByID = function (data, result) {
    db.query(`SELECT * FROM wallets WHERE user_id = ${data}`, function (err, response) {
        if (err || response.length == 0) {
            result({ code: 'er' })
        } else {
            result({ code: 'ss', data: response })
        }
    })
}

Wallet.GetOwnById = function (data, result) {
    db.query(`SELECT * FROM wallets WHERE user_id=${data.user_id} AND id=${data.wallet_id}`, function (err, response) {
        if (err) {
            result({ code: '50', data: null })
        } else {
            if (response.length == 0) {
                result({ code: '40', data: null })
            } else {
                result({ code: '00', data: response })
            }
        }
    })
}

Wallet.GetAll = function (data, result) {
    // console.log(data.data.id)
    db.query(`SELECT * FROM wallets WHERE user_id = ${data.data.id}`, function (err, response) {
        if (err) {
            result({ code: '50', data: null })
        } else {
            if (response.length == 0) {
                result({ code: '40', data: null })
            } else {
                result({ code: '00', data: response })
            }
        }
    })
}
module.exports = Wallet