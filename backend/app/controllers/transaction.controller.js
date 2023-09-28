var Transaction = require('../models/transaction.model')

exports.Create = function(req, res) {
    var data = {}
    data.user_id = req.auth.data
    data.wallet_id = req.body.wallet_id
    let CheckOwnWallet = async(c) => {
        return await Transaction.CheckOwnWallet(c)
    }
    console.log(CheckOwnWallet(data))
}