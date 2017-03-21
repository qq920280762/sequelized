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
        menuNo       : {
            field    : "menu_no",
            type     : DataTypes.STRING(45),
            allowNull: false,
            unique   : "no_UNIQUE",
            comment  : '菜单编号'
        },
        applicationId: {
            field    : "application_id",
            type     : DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            comment  : "域id"
        },
        menuParentNo : {
            field       : "menu_parent_no",
            type        : DataTypes.STRING(45),
            allowNull   : false,
            defaultValue: -1,
            comment     : "上级菜单编号"
        },
        menuName     : {
            field    : "menu_name",
            type     : DataTypes.STRING(45),
            allowNull: false,
            comment  : "菜单名字"
        },
        menuUrl      : {
            field       : "menu_url",
            type        : DataTypes.STRING(100),
            allowNull   : false,
            defaultValue: '#',
            comment     : "菜单url"
        },
        menuIcon     : {
            field    : "menu_icon",
            type     : DataTypes.STRING(100),
            allowNull: false,
            comment  : "菜单icon"
        }
    }, {
        comment: "菜单表"
    });
}
