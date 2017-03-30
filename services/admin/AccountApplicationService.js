'use strict';
const util = require('util');
const model = require('../../model');
const Base  = require('../BaseDao');

//构造函数
function AccountApplicationService() {
    //call:在当前上下文对象中创建Base构造函数中的所有属性和方法
    Base.call(this, model.admin.AccountApplication);
}
//继承BaseDao
util.inherits(AccountApplicationService, Base);

AccountApplicationService.prototype.getApplicationId = function(accountId){
    return new Promise(function(resolve,reject){
        model.admin.AccountApplication.findOne({
           where:{
               accountId:accountId
           }
       })
        .then(function(results){
            resolve((results||{}).id);
        })
        .catch(function(err){
           reject(err);
        });
    });
}


module.exports = AccountApplicationService;