'use strict';
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('person', {
        id          : {
            field        : "user_id",
            type         : DataTypes.INTEGER(11).UNSIGNED,
            allowNull    : false,
            primaryKey   : true,
            autoIncrement: true,
            unique       : 'id_UNIQUE',
            comment      : "用户ID"
        },
        cellphone   : {
            field    : "cellphone",
            type     : DataTypes.STRING(15),
            allowNull: false,
            unique   : 'phone_UNIQUE',
            comment  : "手机号"
        },
        email: {
            field       : "email",
            type        : DataTypes.STRING(45),
            allowNull   : false,
            defaultValue: '',
            unique   : 'email_UNIQUE',
            comment     : "邮箱"
        },
        nickname    : {
            field       : "nickname",
            type        : DataTypes.STRING(45),
            allowNull   : false,
            defaultValue: '',
            comment     : "昵称"
        },
        password    : {
            field    : "password",
            type     : DataTypes.STRING(45),
            allowNull: false,
            comment  : "密码"
        },
        header: {
            field       : "header",
            type        : DataTypes.STRING(100),
            allowNull   : false,
            defaultValue: '',
            comment     : "头像"
        },
        qqOpenId    : {
            field       : "qq_open_id",
            type        : DataTypes.STRING(45),
            allowNull   : false,
            defaultValue: '',
            comment     : "QQ_ID"
        },
        weChatOpenId: {
            field       : "wx_open_id",
            type        : DataTypes.STRING(45),
            allowNull   : false,
            defaultValue: '',
            comment     : "WeChat_ID"
        },
        sinaOpenId  : {
            field       : "sina_open_id",
            type        : DataTypes.STRING(45),
            allowNull   : false,
            defaultValue: '',
            comment     : "Sina_ID"
        }
    }, {
        initialAutoIncrement:1000,
        comment: "用户基本信息表"
    });
}