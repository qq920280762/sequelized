'use strict';
const express = require('express');
const router = express.Router();
const service = require('../../services');
const utils = require('../../utils');
const adminService = service.admin;


router.get('/',function(req,res,next){
    get(req.userId)
    .then(function(results){
        res.jsonp({code:1,msg:'success',data:results});
    })
    .catch(function(err){
        console.error(err);
        res.jsonp({code:-99,msg:'未知错误',data:[]});
    })
});
router.post('/',function(req,res,next){
    save(req.body)
    .then(function(results){
        res.jsonp({code:1,msg:'success',data:results});
    })
    .catch(function(err){
        console.error(err);
        res.jsonp({code:-99,msg:'未知错误',data:[]});
    })
});
router.put('/',function(req,res,next){
    update(req.body)
    .then(function(results){
        res.jsonp({code:1,msg:'success',data:results});
    })
    .catch(function(err){
        console.error(err);
        res.jsonp({code:-99,msg:'未知错误',data:[]});
    })
});
router.delete('/',function(req,res,next){
    destroy(req.query.id)
    .then(function(results){
        res.jsonp({code:1,msg:'success',data:results});
    })
    .catch(function(err){
        console.error(err);
        res.jsonp({code:-99,msg:'未知错误',data:[]});
    })
});


function get(accountId){

    return new Promise(function (resolve, reject) {
        let accountRoleSv = adminService.accountRoleService,
            roleSv = adminService.roleService;
        accountRoleSv.getRoleId(accountId)
        .then(function(results){
            if(results){
                return roleSv.getAllById(results);
            }
        })
        .then(function(results){
            let trees = utils.treesEncode(results,results[results.length-1].pid);
            let roles = utils.treesDecode([trees[0]]);
            resolve(roles||[]);
        })
        .catch(function(err){
           reject(err);
        });
    });

}


function save(bean){
    return new Promise(function (resolve, reject) {
        let roleSv = adminService.roleService;
        roleSv.createEntity(bean)
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
        let roleSv = adminService.roleService;
        roleSv.updateByParams(bean,{id:bean.id})
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
        let roleSv = adminService.roleService;
        roleSv.getCountByPid(id)
        .then(function(results){
            if(!results){
                return roleSv.destroy({id:id});
            }
        })
        .then(function(results){
            resolve(results);
        })
        .catch(function(err){
            reject(err);
        });
    });

}

module.exports = router;
module.exports.get_roles = get;
module.exports.save_roles = save;
module.exports.update_roles = update;
module.exports.destroy_roles = destroy;