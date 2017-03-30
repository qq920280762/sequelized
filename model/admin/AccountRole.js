'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('account_role', {
        id             : {
            field        : "id",
            type         : DataTypes.INTEGER(11).UNSIGNED,
            allowNull    : false,
            unique       : "id_UNIQUE",
            primaryKey   : true,
            autoIncrement: true,
            comment      : "用户角色关联ID"
        },
        accountId      : {
            field    : "account_id",
            type     : DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            comment  : "用户ID"
        },
        roleId         : {
            field    : "role_id",
            type     : DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            comment  : "角色ID"
        },
        createAccountId: {
            field    : "create_account_id",
            type     : DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            defaultValue:0,
            comment  : "创建者ID"
        },
        createTime     : {
            field       : "create_time",
            type        : DataTypes.DATE,
            allowNull   : false,
            defaultValue: DataTypes.NOW,
            comment     : "创建时间"

        }
    }, {
        comment: "用户角色关联表"
    });
}