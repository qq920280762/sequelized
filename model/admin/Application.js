'use strict';


module.exports = function (sequelize, DataTypes) {
    return sequelize.define('application', {
        id             : {
            field        : "application_id",
            type         : DataTypes.INTEGER(11).UNSIGNED,
            allowNull    : false,
            unique       : "id_UNIQUE",
            primaryKey   : true,
            autoIncrement: true,
            comment      : "ID"
        },
        applicationName: {
            field    : "application_name",
            type     : DataTypes.STRING(45),
            allowNull: false,
            comment  : "域名字"
        },
        applicationNo  : {
            field    : "application_no",
            type     : DataTypes.STRING(45),
            allowNull: false,
            unique   : "no_UNIQUE",
            comment  : "域编号"
        },
        applicationDesc: {
            field    : "application_desc",
            type     : DataTypes.STRING(300),
            allowNull: false,
            comment  : "域简介"
        },
        applicationUrl : {
            field       : "application_url",
            type        : DataTypes.STRING(100),
            allowNull   : false,
            defaultValue: '#',
            comment     : "url"
        },
        applicationIcon: {
            field    : "create_account_id",
            type     : DataTypes.STRING(100),
            allowNull: false,
            comment  : "icon"
        },
        createAccountId: {
            field    : "create_account_id",
            type     : DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            comment  : "创建者ID"
        },
        createTime     : {
            field       : "create_time",
            type        : DataTypes.DATE,
            allowNull   : false,
            defaultValue: DataTypes.NOW,
            comment     : "创建时间"

        },
        modifyAccountId: {
            field    : "modify_account_id",
            type     : DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            comment  : "修改者ID"
        },
        modifyTime     : {
            field       : "modify_time",
            type        : DataTypes.DATE,
            allowNull   : false,
            defaultValue: DataTypes.NOW,
            comment     : "修改时间"
        }
    }, {
        comment: "应用表"
    });
}
