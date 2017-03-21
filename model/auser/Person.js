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
        accountNo   : {
            field    : "account_no",
            type     : DataTypes.STRING(15),
            allowNull: false,
            unique   : 'accountNo_UNIQUE',
            comment  : "账号"
        },
        accountMail : {
            field       : "account_mail",
            type        : DataTypes.STRING(30),
            allowNull   : false,
            defaultValue: '',
            unique      : 'accountMail_UNIQUE',
            comment     : "邮箱"
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
        }
    }, {
        comment: "用户基本信息表"
    });
}