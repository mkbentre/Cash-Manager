var Wallet      = require('../models/wallet.model')
var Cataloge    = require('../models/cataloge.model')
var Transaction = require('../models/transaction.model')

exports.Create = function (req, res) {
    var data = {}
    data.user_id = req.auth.data.id
    if (!req.body.wallet_id) {
        return res.send({ code: 40, desc: 'Wallet Invalid', data: null })
    } else {
        data.wallet_id = req.body.wallet_id
    }
    if(!req.body.note) {
        data.note = ''
    }else{
        data.note = req.body.note
    }
    if(!req.body.cataloge_id) {
        return res.send({ code: 40, desc: 'Require Cataloge_id', data: null })
    }else{
        data.cataloge_id = req.body.cataloge_id
    }
    data.cash = req.body.cash
    let CheckIdInArr = function (data, wallet_id) {
        let result = false
        data.forEach(element => {
            if (element.id == wallet_id) {
                result = true
            }
        });
        return result
    }
    try {
        Wallet.GetWalletByID(data.user_id, function (response) {
            if (response.code == 'ss') {
                if (CheckIdInArr(response.data, data.wallet_id) == false) {
                    return res.send({ code: '43', desc: 'You do not own this wallet!', data: null })
                } else {
                    try {
                        Cataloge.GetCatalogeById(data.cataloge_id, function (response) {
                            if (response.data.user_id == 0 || response.data.user_id == user_id) {
                                data.type =response.data.type;

                                Transaction.Create(data, function(response) {
                                    if(response.code == '00') {
                                        res.send({ code: '00', desc: 'Create Success!', data: response})
                                    }else{
                                        return res.send({ code: '50', desc: 'Create Fail', data: null })
                                    }
                                });
                            }else{
                                return res.send({ code: '43', desc: 'Wrong !', data: null })
                            }
                        })
                    } catch (error) {
                        return res.send({ code: '50', desc: 'Err DB', data: null })
                    }
                }

            } else {
                return res.send({ code: '40', desc: 'Not Found Your Wallet', data: null })
            }

        })
    } catch (error) {

    }
}
