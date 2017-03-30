'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('accountApplication', {
        id             : {
            field        : "id",
            type         : DataTypes.INTEGER(11).UNSIGNED,
            allowNull    : false,
            unique       : "id_UNIQUE",
            primaryKey   : true,
            autoIncrement: true,
            comment      : "用户域关联ID"
        },
        accountId      : {
            field    : "account_id",
            type     : DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            comment  : "用户ID"
        },
        applicationId  : {
            field    : "application_id",
            type     : DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            comment  : "域ID"
        },
        createAccountId: {
            field    : "crate_account_id",
            type     : DataTypes.INTEGER(11).UNSIGNED,
            defaultValue:0,
            allowNull: false,
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
        comment: "用户域关联表"
    });
}