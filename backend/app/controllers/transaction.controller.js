var Transaction = require('../models/transaction.model')
var Wallet = require('../models/wallet.model')

exports.Create = function(req, res) {
    var data = {}
    data.user_id = req.auth.data.id
    // if(!req.body.wallet_id) {
    //     return res.send({code: 40, desc: 'Wallet Invalid', data: null})
    // }else{
    //     data.wallet_id = req.body.wallet_id
    // }
    try {
        Wallet.GetWalletByID(data.user_id, function(response) {
            if(response.code == 'ss') {
                console.log(response.data)
            }else{
                return res.send({code: '40', desc: 'Not Found Your Wallet', data: null})
            }
            
        })
    } catch (error) {
        
    }
}