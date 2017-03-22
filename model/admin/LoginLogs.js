'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('login_logs', {
        id : {
            field        : "login_logs_id",
            type         : DataTypes.INTEGER(11).UNSIGNED,
            allowNull    : false,
            unique       : "id_UNIQUE",
            primaryKey   : true,
            autoIncrement: true,
            comment      : "登陆日志ID"
        },
        accountId      : {
            field    : "account_id",
            type     : DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            comment  : "用户ID"
        },
        device : {
            field    : "device",
            type     : DataTypes.STRING(45),
            allowNull: false,
            comment     : "设备号"
        },
        deviceType     : {
            field       : "device_type",
            type        : DataTypes.ENUM,
            values      : ["0", "1", "2"],
            allowNull   : false,
            defaultValue: '0',
            comment     : "设备类型 0电脑 1:手机 2平板"

        },
        ipAddress     : {
            field       : "ip_address",
            type        : DataTypes.STRING(15),
            allowNull   : false,
            defaultValue: '',
            comment     : "IP地址"

        },
        createTime  : {
            field       : "create_time",
            type        : DataTypes.DATE,
            allowNull   : false,
            unique   : "login_time_UNIQUE",
            defaultValue: DataTypes.NOW,
            comment     : "创建时间"

        }
    }, {
        comment: "登陆日志表"
    });
}