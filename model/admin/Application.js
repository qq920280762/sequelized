'use strict';


module.exports = function (sequelize, DataTypes) {
    return sequelize.define('application', {
        id             : {
            field        : "id",
            type         : DataTypes.INTEGER(11).UNSIGNED,
            allowNull    : false,
            unique       : "id_UNIQUE",
            primaryKey   : true,
            autoIncrement: true,
            comment      : "ID"
        },
        name: {
            field    : "name",
            type     : DataTypes.STRING(45),
            allowNull: false,
            comment  : "域名字"
        },
        pid  : {
            field    : "pid",
            type     : DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            defaultValue:0,
            comment  : "上级域"
        },
        url : {
            field       : "url",
            type        : DataTypes.STRING(100),
            allowNull   : false,
            defaultValue: 'javascript:;',
            comment     : "url"
        },
        icon: {
            field    : "icon",
            type     : DataTypes.STRING(100),
            allowNull: false,
            defaultValue:'',
            comment  : "icon"
        },
        createTime     : {
            field       : "create_time",
            type        : DataTypes.DATE,
            allowNull   : false,
            defaultValue: DataTypes.NOW,
            comment     : "创建时间"

        }
    }, {
        comment: "应用表"
    });
}
