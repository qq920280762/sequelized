'use strict';
const util = require('util');
const model = require('../../model');
const Base  = require('../BaseDao');

//构造函数
function RoleService() {
    //call:在当前上下文对象中创建Base构造函数中的所有属性和方法
    Base.call(this, model.admin.Role);
}
//继承BaseDao
util.inherits(RoleService, Base);

module.exports = RoleService;