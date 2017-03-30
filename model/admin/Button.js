'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('button', {
        id        : {
            field        : "id",
            type         : DataTypes.INTEGER(11).UNSIGNED,
            allowNull    : false,
            unique       : 'id_UNIQUE',
            primaryKey   : true,
            autoIncrement: true,
            comment      : "按钮ID"
        },
        name   : {
            field    : "name",
            type     : DataTypes.STRING(45),
            allowNull: false,
            comment  : "按钮名字"

        },
        icon   : {
            field    : "icon",
            type     : DataTypes.STRING(100),
            allowNull: false,
            defaultValue: '',
            comment  : "按钮icon"
        },
        url    : {
            field    : "url",
            type     : DataTypes.STRING(100),
            allowNull: false,
            defaultValue: 'javascript:;',
            comment  : "按钮url"
        },
        menuId     : {
            field    : "menu_id",
            type     : DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            comment  : "菜单ID"
        },
        initStatus: {
            field       : "init_status",
            type        : DataTypes.ENUM,
            allowNull   : false,
            values      : ["hidden", "show"],
            defaultValue: "show",
            comment     : "初始化状态"
        }
    }, {
        comment: "按钮表"
    });
}