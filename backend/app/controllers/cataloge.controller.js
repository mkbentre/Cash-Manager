const { response } = require('express')
var Cataloge = require('../models/cataloge.model')

exports.Create = function(req, res) {
    var data = {}
    data.user_id = req.auth.data
    if(!req.body.parent_id) {
        data.parent_id = 0
    }else{
        data.parent_id = req.body.parent_id
    }
    if(req.body.name.length < 2) {
        return res.send({code: '40', desc: 'Name invalid!', data: null});
    }
    data.name = req.body.name
    if(req.body.type > 2 || req.body.type <= 0) {
        return res.send({code: '40', desc: 'Cataloge type invalid!', data: null});
    }
    data.type = req.body.type
    try {
        checkN = Cataloge.CheckExistName(data.name, function(response) {
            console.log(response.exist)
            if (response.exist == 1) {
                return res.send({code: '40', desc: 'Name existing!', data: null});
            }
            if(response.exist == 0) {
                try {
                    Cataloge.Create(data, function(response) {
                        res.send({code: '00', desc: 'Success', data: response}); 
                    })
                } catch (error) {
                    return res.send({code: '50', desc: 'Create faill!', data: null});
                }
            }else{
                return res.send({code: '50', desc: 'Something wrong', data: null});
            }
        })
    } catch (error) {
        return res.send({code: '50', desc: 'Something wrong', data: null});
    }
    
    
}
exports.GetAll = function(req, res) {
    try {
        Cataloge.GetAll(function(response) {
            res.send({code: '00', desc: 'Success', data: response})
        })
    } catch (error) {
        res.send({code: '50', desc: 'Something wrong', data: null})
    }
}
exports.Delete = function(req, res) {
    if(!req.params.id) {
        res.send({code: '40', desc: 'Require id', data: null})
    }
    try{
        Cataloge.Delete(req.params.id, function(response) {
            res.send({code: '00', desc: 'Success', data: response})
        })
    }catch(error) {
        res.send({code: '50', desc: 'Something wrong', data: null})
    }
}
exports.Update = function(req, res) {
    var data = {}
}
exports.AdminCreate = function(req, res) {
    if(req.auth.data.role != 'admin') {
        return res.send({code: '43', desc: 'Access Deny!', data: null});
    }
    var data = {}
    data.user_id = 0
    if(!req.body.parent_id) {
        data.parent_id = 0
    }else{
        data.parent_id = req.body.parent_id
    }
    if(!req.body.name || req.body.name.length < 2) {
        return res.send({code: '40', desc: 'Name invalid!', data: null});
    }
    data.name = req.body.name
    if(req.body.type > 2 || req.body.type <= 0) {
        return res.send({code: '40', desc: 'Cataloge type invalid!', data: null});
    }
    data.type = req.body.type
    try {
        checkN = Cataloge.CheckExistName(data.name, function(response) {
            if (response.exist == 1) {
                return res.send({code: '40', desc: 'Name existing!', data: null});
            }
            if(response.exist == 0) {
                try {
                    Cataloge.Create(data, function(response) {
                        res.send({response}); 
                    })
                } catch (error) {
                    return res.send({code: '50', desc: 'Create faill!', data: null});
                }
            }else{
                return res.send({code: '50', desc: 'Something wrong', data: null});
            }
        })
    } catch (error) {
        return res.send({code: '50', desc: 'Something wrong', data: null});
    }
}