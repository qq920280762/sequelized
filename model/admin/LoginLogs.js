'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('login_logs', {
        loginLogsId : {
            field        : "login_logs_id",
            type         : DataTypes.INTEGER(11).UNSIGNED,
            allowNull    : false,
            unique       : "id_UNIQUE",
            primaryKey   : true,
            autoIncrement: true,
            comment      : "登陆日志ID"
        },
        loginAccount: {
            field    : "login_account",
            type     : DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false
        },
        loginIp     : {
            field    : "login_ip",
            type     : DataTypes.STRING(45),
            allowNull: false
        },
        loginDevice : {
            field    : "login_device",
            type     : DataTypes.STRING(45),
            allowNull: false
        },
        createTime  : {
            field       : "create_time",
            type        : DataTypes.DATE,
            allowNull   : false,
            defaultValue: DataTypes.NOW,
            comment     : "创建时间"

        }
    }, {
        comment: "登陆日志表"
    });
}