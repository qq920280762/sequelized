'use strict';
const express = require('express');
const applications = require('./applications');
const privileges = require('./privileges');
const roles = require('./roles');

const service = require('../../services');
const utils = require('../../utils');
const adminService = service.admin;


const router = express.Router();

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
        let appList = [],roleList=[],
            appIds = [],roleIds = [],
            menuIds = [];
        let menuSv = adminService.menuService;
        applications.get_applications(accountId)
        .then(function(results){
            if(results && results.length>0){
                appList = results;
                appList.forEach(function(v){
                    appIds.push(v.dataValues.id);
                });
                return roles.get_roles(accountId);
            }
        })
        .then(function(results){
            if(results && results.length>0){
                roleList = results;
                roleList.forEach(function(v){
                    roleIds.push(v.dataValues.id);
                })
            }
            if(appList.length>0){
                return privileges.get_privileges('account_id',[accountId],'menu_id');
            }
        })
        .then(function(results){
            if(results && results.length>0){
                results.forEach(function(v){
                    menuIds.push(v.accessValue);
                });
            }
            if(appList.length>0 && roleList.length>0){
                return privileges.get_privileges('role_id',roleIds,'menu_id');
            }
        })
        .then(function(results){
            if(results && results.length>0){
                results.forEach(function(v){
                    menuIds.push(v.accessValue);
                });
            }
            if(appIds.length>0 && menuIds.length>0){
                return menuSv.getAllByIdsAndAppIds(appIds,menuIds);
            }
        })
        .then(function(results){
            resolve(results||[]);
        })
        .catch(function(err){
            reject(err);
        });
    });

}
function save(bean,trans){
    return new Promise(function (resolve, reject) {
        let menuSv = adminService.menuService;
        menuSv.createEntity(bean,trans)
        .then(function(results){
            return privileges.save_privileges({
                master:'account_id',
                masterValue:bean.userId,
                access:'menu_id',
                accessValue:results.dataValues.id,
                acl:15
            },trans);
            resolve(results);
        })
        .catch(function(err){
            reject(err);
        });

    });

}
function update(bean){

    return new Promise(function (resolve, reject) {
        let menuSv = adminService.menuService;
        menuSv.updateByParams(bean,{id:bean.id})
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
        let menuSv = adminService.menuService;
        menuSv.getCountByPid(id)
            .then(function(results){
                if(!results){
                    return menuSv.destroy({id:id});
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
module.exports.get_menus = get;
module.exports.save_menus = save;
module.exports.update_menus = update;
module.exports.destroy_menus = destroy;