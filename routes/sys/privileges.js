'use strict';
const express = require('express');
const router = express.Router();

const service = require('../../services');
const utils = require('../../utils');
const adminService = service.admin;

router.get('/',function(req,res,next){
    get();
});
router.post('/',function(req,res,next){
    save();
});
router.put('/',function(req,res,next){
    update();
});
router.delete('/',function(req,res,next){
    destroy();
});


function get(master,masterValues,access){
    return new Promise(function (resolve, reject) {
        let privilegeSv = adminService.privilegeService;
        privilegeSv.getAllByMaster(master,masterValues,access)
        .then(function(results){
            resolve(results);
        })
        .catch(function(err){
            reject(err);
        })
    });

}

function save(bean,trans){
    return new Promise(function (resolve, reject) {
        let  privilegeSv = adminService.privilegeService;
        privilegeSv.createEntity(bean,trans)
            .then(function(results){
                resolve(results);
            })
            .catch(function(err){
                reject(err);
            });

    });

}
function update(bean){

    return new Promise(function (resolve, reject) {
        let  privilegeSv = adminService.privilegeService;
        privilegeSv.updateByParams(bean,{id:bean.id})
            .then(function(results){
                resolve(results);
            })
            .catch(function(err){
                reject(err);
            });
    });

}
function destroy(id){
    return new Promise(function (resolve, reject) {
        let  privilegeSv = adminService.privilegeService;
        privilegeSv.destroy({id:id})
            .then(function(results){
                resolve(results);
            })
            .catch(function(err){
                reject(err);
            });
    });

}

module.exports = router;
module.exports.get_privileges = get;
module.exports.save_privileges = save;
module.exports.update_privileges = update;
module.exports.destroy_privileges = destroy;