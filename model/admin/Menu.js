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
        menNo       : {
            field    : "men_no",
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
        pMenNo : {
            field       : "p_men_no",
            type        : DataTypes.STRING(45),
            allowNull   : false,
            defaultValue: -1,
            comment     : "上级菜单编号"
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
        }
    }, {
        comment: "菜单表"
    });
}
