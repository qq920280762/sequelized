'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('menu', {
        id           : {
            field        : "menu_id",
            type         : DataTypes.INTEGER(11).UNSIGNED,
            allowNull    : false,
            unique       : "id_UNIQUE",
            primaryKey   : true,
            autoIncrement: true,
            comment      : "菜单ID"
        },
        applicationId: {
            field    : "application_id",
            type     : DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            comment  : "域id"
        },
        pid : {
            field       : "pid",
            type        : DataTypes.INTEGER(11).UNSIGNED,
            allowNull   : false,
            defaultValue:0,
            comment     : "上级菜单"
        },
        name     : {
            field    : "name",
            type     : DataTypes.STRING(45),
            allowNull: false,
            comment  : "菜单名字"
        },
        url      : {
            field       : "url",
            type        : DataTypes.STRING(100),
            allowNull   : false,
            defaultValue: 'javascript:;',
            comment     : "菜单url"
        },
        icon     : {
            field    : "icon",
            type     : DataTypes.STRING(100),
            allowNull: false,
            defaultValue:'',
            comment  : "菜单icon"
        },
        createTime     : {
            field       : "create_time",
            type        : DataTypes.DATE,
            allowNull   : false,
            defaultValue: DataTypes.NOW,
            comment     : "创建时间"

        }
    }, {
        comment: "菜单表"
    });
}
