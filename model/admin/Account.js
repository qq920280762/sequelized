'use strict';
//定义模型
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('account', {
        id             : {
            field        : "account_id",
            type         : DataTypes.INTEGER(11).UNSIGNED,
            allowNull    : false,
            primaryKey   : true,
            autoIncrement: true,
            unique       : "id_UNIQUE",
            //注意comment在V1.7+后对字段无效 只对表有效
            comment      : "用户ID"
        },
        header: {
            field       : "header",
            type        : DataTypes.STRING(100),
            allowNull   : false,
            defaultValue: '',
            comment     : "头像"
        },
        email: {
            field       : "email",
            type        : DataTypes.STRING(45),
            allowNull   : false,
            defaultValue: '',
            comment     : "邮箱"
        },
        nickname: {
            field       : "nickname",
            type        : DataTypes.STRING(45),
            allowNull   : false,
            defaultValue: '',
            comment     : "昵称"
        },
        password: {
            field    : "password",
            type     : DataTypes.STRING(45),
            allowNull: false,
            comment  : "密码"
        },
        signature          : {
            field    : "signature",
            type     : DataTypes.STRING(100),
            allowNull: false,
            defaultValue: '',
            comment  : "职称"
        },
        sex            : {
            field       : "sex",
            type        : DataTypes.ENUM,
            values      : ["0", "1", "2"],
            allowNull   : false,
            defaultValue: '2',
            comment     : "性别 0男 1女 2保密"
        },
        cellphone      : {
            field    : "cellphone",
            type     : DataTypes.STRING(15),
            allowNull: false,
            defaultValue: '',
            unique   : "cellphone_UNIQUE",
            comment  : "手机号"
        },
        accountNo:{
            field    : "account_no",
            type     : DataTypes.STRING(45),
            allowNull: false,
            unique   : "accountNo_UNIQUE",
            comment  : "账号"
        },
        createTime     : {
            field       : "create_time",
            type        : DataTypes.DATE,
            allowNull   : false,
            defaultValue: DataTypes.NOW,
            comment     : "创建时间"

        },
        loginTime     : {
            field       : "login_time",
            type        : DataTypes.DATE,
            allowNull   : false,
            defaultValue: DataTypes.NOW,
            comment     : "登录时间"

        },
        deviceType     : {
            field       : "device_type",
            type        : DataTypes.ENUM,
            values      : ["0", "1", "2"],
            allowNull   : false,
            defaultValue: '0',
            comment     : "登录设备类型 0电脑 1:手机 2平板"

        },
        ipAddress     : {
            field       : "ip_address",
            type        : DataTypes.STRING(15),
            allowNull   : false,
            defaultValue: '',
            comment     : "登录IP地址"

        }
    }, {
        initialAutoIncrement:10000,
        comment: "用户账号表"
    });
}