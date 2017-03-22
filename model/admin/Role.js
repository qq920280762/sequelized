'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('role', {
        id             : {
            field        : "role_id",
            type         : DataTypes.INTEGER(11).UNSIGNED,
            allowNull    : false,
            unique       : "id_UNIQUE",
            primaryKey   : true,
            autoIncrement: true,
            comment      : "角色ID"
        },
        name       : {
            field    : "name",
            type     : DataTypes.STRING(45),
            allowNull: false,
            comment  : "角色名字"
        },
        roleNo         : {
            field    : "role_no",
            type     : DataTypes.STRING(45),
            allowNull: false,
            unique   : "no_UNIQUE",
            comment  : "角色编号"
        },
        memo       : {
            field    : "memo",
            type     : DataTypes.STRING(45),
            allowNull: false,
            comment  : "备注"

        },
        createTime     : {
            field       : "create_time",
            type        : DataTypes.DATE,
            allowNull   : false,
            defaultValue: DataTypes.NOW,
            comment     : "创建时间"

        }
    }, {
        comment: "角色表"
    });
}