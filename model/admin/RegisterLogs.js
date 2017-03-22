'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('register_logs', {
        id : {
            field        : "register_logs_id",
            type         : DataTypes.INTEGER(11).UNSIGNED,
            allowNull    : false,
            unique       : "id_UNIQUE",
            primaryKey   : true,
            autoIncrement: true,
            comment      : "注册日志ID"
        },
        accountId      : {
            field    : "account_id",
            type     : DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            comment  : "用户ID"
        },
        ip     : {
            field    : "ip",
            type     : DataTypes.STRING(45),
            allowNull: false
        },
        device : {
            field    : "device",
            type     : DataTypes.STRING(45),
            allowNull: false
        },
        createTime  : {
            field       : "create_time",
            type        : DataTypes.DATE,
            allowNull   : false,
            unique   : "register_time_UNIQUE",
            defaultValue: DataTypes.NOW,
            comment     : "创建时间"

        }
    }, {
        comment: "注册日志表"
    });
}