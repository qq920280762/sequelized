'use strict';

//基类构造函数
function Base(model) {
    this.model = model;
};

/**
 * 根据id查询
 * @param {Object} where A hash of search attributes
 */
Base.prototype.getOne = function (where) {
    return new Promise((resolve, reject) => {
        this.model.findOne({
                where: where
            })
            .then(function (result) {
                resolve(result);
            })
            .catch(function (ex) {
                reject(ex);
                throw ex;
            });
    });
};

/**
 * 查询列表
 * @param where 筛选条件 eg. {name: 'mike'}
 * @param order 排序规则 eg. 'createTime desc'
 */
Base.prototype.getAll = function (where, page, pageSize, order) {
    return new Promise((resolve, reject) => {
        let model = this.model;

        let options = {}
        if(!!where){
            options.where = where;
        }
        if(page>0&&pageSize>0){
            options.offset = (page - 1) * pageSize;
            options.limit  = pageSize;
        }
        if(!!order){
            options.order = order;
        }

        model.findAll(options)
            .then(function (result) {
                resolve(result);
            })
            .catch(function (ex) {
                reject(ex);
                throw ex;
            });
    });
};

/**
 * 查询列表(带统计条目)
 * @param where 筛选条件 eg. {name: 'mike'}
 * @param order 排序规则 eg. 'createTime desc'
 */
Base.prototype.getAndCountAll = function (where, page, pageSize, order) {
    return new Promise((resolve, reject) => {
        let model = this.model;

        let options = {
            order: 'id desc'
        };
        if(!!where){
            options.where = where;
        }
        if(page>0&&pageSize>0){
            options.offset = (page - 1) * pageSize;
            options.limit  = pageSize;
        }
        if(!!order){
            options.order = order;
        }

        model.findAndCountAll(options)
            .then(function (result) {
                resolve(result);
            })
            .catch(function (ex) {
                reject(ex);
                throw ex;
            })

    });
};

/**
 * 统计条目
 * @param where 筛选条件 eg. {name: 'mike'}
 */
Base.prototype.count = function (where) {
    return new Promise((resolve, reject) => {
        this.model.count({
                where: where
            })
            .then(function (result) {
                resolve(result);
            })
            .catch(function (ex) {
                reject(ex);
                throw ex;
            })
    });
};

/**
 * 添加实体
 * @param entity 实体信息 eg. {id: 1,name: 'mike'}
 * @param tran
 */
Base.prototype.createEntity = function (entity, tran) {
    return new Promise((resolve, reject) => {
        let model = this.model;
        let options = {};
        if (tran && (tran instanceof Transaction)) {
            options.transaction = tran;
        }
        model.create(entity,options).then(function (result) {
            resolve(result);
        }).catch(function (ex) {
            reject(ex);
            throw ex;
        });
    });
};

/**
 * 批量添加实体
 * @param entities 实体列表
 * @param tran
 */
Base.prototype.createEntityBatch = function (entities, tran) {
    return new Promise((resolve, reject) => {
        let model = this.model;
        let options = {};
        if (tran && (tran instanceof Transaction)) {
            options.transaction = tran;
        }
        return Promise.all(entities.map((entity) => {
            return model.create(entity,options);
        })).then((results) => {
            resolve(results);
        }).catch(function (ex) {
            reject(ex);
            throw ex;
        });

    });
};

/**
 * 更新实体
 * @param update 待修改的字段 eg. {lastLoginTime: new Date()}
 * @param where  筛选条件    eg. {id: result.id}
 * @param tran
 */
Base.prototype.updateByParams = function (update, where, tran) {
    return new Promise((resolve, reject) => {
        let model = this.model;
        if(!update){
            reject(' [ '+model.tableName+' ] : Updated data can not be empty !');
        }
        let options = {
            where:where
        };
        if (tran && (tran instanceof Transaction)) {
            options.transaction = tran;
        }
        model.update(update,options).then(function (result) {
            resolve(result);
        }).catch(function (ex) {
            reject(ex);
            throw ex;
        });
    });
};

/**
 * 物理删除实体
 * @param where  筛选条件   eg. {id: result.id}
 * @param tran
 */
Base.prototype.destroy = function (where, tran) {
    return new Promise((resolve, reject) => {
        let model = this.model;
        let options = {
            where:where
        };
        if (tran && (tran instanceof Transaction)) {
            options.transaction = tran;
        }
        model.destroy(options).then(function (result) {
            resolve(result);
        }).catch(function (ex) {
            reject(ex);
            throw ex;
        });
    });
};

/**
 * 聚合查询
 * @param {String}          field 字段名, eg. id, *
 * @param {String}          aggregateFunction 聚合函数名称, eg. sum, max etc.
 * @param {Object}          [options] Query options. See sequelize.query for full options
 * @param {Object}          [options.where] A hash of search attributes.
 * @param {Function}        [options.logging=false] A function that gets executed while running the query to log the sql.
 * @param {Boolean}         [options.benchmark=false] Pass query execution time in milliseconds as second argument to logging function (options.logging).
 * @param {DataType|String} [options.dataType] The type of the result. If `field` is a field in this Model, the default will be the type of that field, otherwise defaults to float.
 * @param {boolean}         [options.distinct] Applies DISTINCT to the field being aggregated over
 * @param {Transaction}     [options.transaction] Transaction to run query under
 * @param {Boolean}         [options.plain] When `true`, the first returned value of `aggregateFunction` is cast to `dataType` and returned. If additional attributes are specified, along with `group` clauses, set `plain` to `false` to return all values of all returned rows.  Defaults to `true`
 */
Base.prototype.aggregate = function(field, aggregateFunction, options) {
    return new Promise((resolve, reject) => {
        this.model.aggregate(field, aggregateFunction, options)
            .then(function (result) {
                resolve(result);
            })
            .catch(function (ex) {
                reject(ex);
                throw ex;
            })
    });
};

/**
 * 聚合计算-求和
 * @param {String} field 字段名 eg. 'id'
 * @param {Object} [options] See aggregate
 * @see {Base#aggregate} for options
 *
 * @return {Promise<Number>}
 */
Base.prototype.sum = function (field, options) {
    return this.aggregate(field, 'sum', options);
};

/**
 * 聚合计算-求最大值
 *
 * @param {String} field
 * @param {Object} [options] See aggregate
 * @see {Base#aggregate} for options
 */
Base.prototype.max = function (field, options) {
    return this.aggregate(field, 'max', options);
};

/**
 * 聚合计算-求最小值
 *
 * @param {String} field
 * @param {Object} [options] See aggregate
 * @see {Base#aggregate} for options
 */
Base.prototype.min = function (field, options) {
    return this.aggregate(field, 'min', options);
};

/**
 * 聚合计算-字段列表
 * @param {Array}   fields 字段名集合 eg. ['id','name']
 * @param {Object} [options.where] A hash of search attributes.
 * @param {String} aggregateFunction 聚合方式.
 * @param {Object} [options.attributes] 需要查询的字段.
 * @returns {Promise}
 */
Base.prototype.aggregateAndFields = function (fields,aggregateFunction, options) {
    return new Promise((resolve, reject) => {
        let model      = this.model;
        let attributes = options.attributes||[];
        function columnRename(str) {
            var re = /_(\w)/g;
            return str.replace(re, function ($0, $1) {
                return $1.toUpperCase();
            });
        }

        fields.forEach(function (one) {
            attributes.push([model.sequelize.fn(aggregateFunction,model.sequelize.col(one)), columnRename(one+'_'+aggregateFunction)])
        });
        if(!!attributes){
            options.attributes = attributes;
        }
        model.findAll(options)
            .then(function (results) {
                resolve(results);
            })
            .catch(function (e) {
                reject(e);
                throw e;
            })
    });
};

/**
 * 自定义sql查询
 *
 * @param {Sequelize} sequelize
 * @param {String} sql
 */
Base.prototype.queryBySql = function (sql) {
    return new Promise((resolve, reject) => {
        let model      = this.model;
        model.sequelize.query(sql, {type: model.sequelize.QueryTypes.SELECT})
            .then(function (results) {
                resolve(results);
            })
            .catch(function (e) {
                reject(e);
                throw e;
            })
    });
};


module.exports = Base;