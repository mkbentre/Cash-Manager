var Wallet = require('../models/wallet.model')
exports.Create = function (req, res) {
    var data = {}
    data.user_id = req.auth.data
    data.wallet_name = req.body.wallet_name
    data.currency = req.body.currency
    if (data.wallet_name.length < 3) {
        return res.send({ err: 'Wallet name invalid!' });
    }
    try {
        Wallet.CheckQtyWallet(user_id, function (response) {
            if (response.qty > 10) {
                return res.send({ err: 'You have created more than the allowed wallets' });
            } else {
                if (data.currency == "VND" || data.currency == "USD") {
                    try {
                        Wallet.Create(data, function (response) {
                            res.send({ result: response });
                        });
                    } catch (error) {
                        return res.send({ err: 'Create Wallet Fail' });
                    }
                } else {
                    return res.send({ err: 'Currency invalid' });
                }
            }
        })
    } catch (error) {
        return res.send({ err: 'something went wrong!' });
    }
}

exports.Delete = function (req, res) {
    if (!req.params.id) {
        res.send({ code: '40', desc: 'Require id', data: null })
    }
    try {
        Wallet.Delete(req.params.id, function (response) {
            if (response.code == '50') {
                res.send({ code: '50', desc: 'Something wrong', data: null })
            }
            if (response.code == '40') {
                res.send({ code: '40', desc: 'ID Not Found!', data: null })
            }
            if (response.code == '00') {
                res.send({ code: '00', desc: 'ID ' + response.id + ' Deleted!', data: response.id })
            }
        })
    } catch (error) {
        res.send({ code: '50', desc: 'Something wrong', data: null })
    }
}
