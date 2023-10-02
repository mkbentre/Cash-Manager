var Wallet = require('../models/wallet.model')
var Transaction = require('../models/transaction.model')
exports.Create = function (req, res) {
    var data = {}
    data.user_id = req.auth.data.id
    data.wallet_name = req.body.wallet_name
    data.currency = req.body.currency
    if (!data.wallet_name || data.wallet_name.length < 3) {
        return res.send({ code: '40', desc: 'Wallet name invalid!', data: null });
    }
    try {
        Wallet.CheckQtyWallet(data.user_id, function (response) {
            if (response.data.qty > 9) {
                return res.send({ code: '43', desc: 'You have reached your limit, please delete your wallet and then create it again', data: null});
            } else {
                if (data.currency == "VND" || data.currency == "USD") {
                    try {
                        Wallet.Create(data, function (response) {
                            res.send({ result: response });
                        });
                    } catch (error) {
                        return res.send({ code: '50', desc: 'Create Wallet Fail', data: null });
                    }
                } else {
                    return res.send({ code: '40', desc: 'Currency invalid', data: null });
                }
            }
        })
    } catch (error) {
        return res.send({ code: '50', desc: 'something went wrong!', data: null });
    }
}

// Khi xóa ví thì cũng phải xóa các giao dịch liên quan đến ví đó
exports.Delete = function (req, res) {
    var data = {}
    if (!req.body.wallet_id || !(req.body.wallet_id > 1)) {
        res.send({ code: '40', desc: 'Wallet ID invalid', data: null })
    }else{
        data.wallet_id = req.body.wallet_id
    }
    data.user_id = req.auth.data.id
    // res.send({ code: '40', desc: 'user id là:', data: req.auth.data.id })

    function getres (getres) {
        return(getres);
    }
    let check = function(data) {
        return Wallet.GetOwnById(data)
    }
    console.log(check(data))
    // try {
    //     Wallet.GetOwnById(data, function(response) {
    //         if(response.code == '00') {
    //             Wallet.Delete(data.wallet_id, function (response) {
    //                 // 
    //             })
    //             Transaction.DeleteByWallet(data, function(response) {
    //                 // 
    //             })
    //         }
    //     })
    // } catch (error) {
    //     res.send({ code: '40', desc: 'something went wrong!', data: null })
    // }

    // try {
    //     Wallet.Delete(req.params.id, function (response) {
    //         if (response.code == '50') {
    //             res.send({ code: '50', desc: 'Something wrong', data: null })
    //         }
    //         if (response.code == '40') {
    //             res.send({ code: '40', desc: 'ID Not Found!', data: null })
    //         }
    //         if (response.code == '00') {
    //             res.send({ code: '00', desc: 'ID ' + response.id + ' Deleted!', data: response.id })
    //         }
    //     })
    // } catch (error) {
    //     res.send({ code: '50', desc: 'Something wrong', data: null })
    // }
}
