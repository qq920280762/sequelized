'use strict';
const util = require('util');
const model = require('../../model');
const Base  = require('../BaseService');

//构造函数
function ButtonService() {
    //call:在当前上下文对象中创建Base构造函数中的所有属性和方法
    Base.call(this, model.admin.Button);
}
//继承BaseDao
util.inherits(ButtonService, Base);

module.exports = ButtonService;