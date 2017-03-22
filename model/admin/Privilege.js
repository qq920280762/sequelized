'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('privilege', {
        id                  : {
            field        : "privilege_id",
            type         : DataTypes.INTEGER(11).UNSIGNED,
            allowNull    : false,
            unique       : "id_UNIQUE",
            primaryKey   : true,
            autoIncrement: true,
            comment      : "权限ID"
        },
        master     : {
            field    : "master",
            type     : DataTypes.ENUM,
            values   : ["account_id", "role_id"],
            allowNull: false,
            comment  : "用户ID或者角色ID"
        },
        masterValue: {
            field    : "master_value",
            type     : DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            comment  : "用户ID或者角色ID的值"
        },
        access     : {
            field    : "access",
            type     : DataTypes.ENUM,
            values   : ["menu_no", "btn_no"],
            allowNull: false,
            comment  : "菜单号或按钮号"
        },
        accessValue: {
            field    : "access_value",
            type     : DataTypes.STRING(45),
            allowNull: false,
            comment  : "用户ID或者角色ID的值"
        },
        status  : {
            field       : "privilege_operation",
            type        : DataTypes.ENUM,
            values      : ["enabled", "disabled"],
            defaultValue: "enabled",
            allowNull   : false,
            comment     : "权限启用或禁用"
        },
        acl        : {
            field    : "acl",
            type     : DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            comment  : "权限值"
        }
    }, {
        comment: "权限表"
    });
}