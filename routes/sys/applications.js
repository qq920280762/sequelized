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
        let accountApplicationSv = adminService.accountApplicationService,
            applicationSv = adminService.applicationService;
        accountApplicationSv.getApplicationId(accountId)
        .then(function(results){
            if(results){
                return applicationSv.getAllById(results);
            }
        })
        .then(function(results){
            let trees = utils.treesEncode(results,results[results.length-1].pid);
            let applications = utils.treesDecode([trees[0]]);
            resolve(applications||[]);
        })
        .catch(function(err){
           reject(err);
        });
    });

}


function save(bean){
    return new Promise(function (resolve, reject) {
        let  applicationSv = adminService.applicationService;
        applicationSv.createEntity(bean)
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
        let applicationSv = adminService.applicationService;
        applicationSv.updateByParams(bean,{id:bean.id})
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
        let applicationSv = adminService.applicationService;
        applicationSv.getCountByPid(id)
        .then(function(results){
            if(!results){
                return applicationSv.destroy({id:id});
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
module.exports.get_applications = get;
module.exports.save_applications = save;
module.exports.update_applications = update;
module.exports.destroy_applications = destroy;