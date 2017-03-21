'use strict';

module.exports = function(sequelize,DataTypes) {
    return sequelize.define('edit_logs', {
        editLogsId: {
            field:"editLogs_id",
            type         : DataTypes.INTEGER(11).UNSIGNED,
            allowNull    : false,
            unique       : 'id_UNIQUE',
            primaryKey   : true,
            autoIncrement: true,
            comment      : "编辑日志ID"
        },
        editAccount: {
            field:"edit_account",
            type     : DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false
        },
        logsTitle  : {
            field:"logs_title",
            type     : DataTypes.STRING(45),
            allowNull: false
        },
        logsDesc   : {
            field:"logs_desc",
            type     : DataTypes.STRING(45),
            allowNull: false
        },
        editType   : {
            field:"edit_type",
            type     : DataTypes.INTEGER(2).UNSIGNED,
            allowNull: false
        },
        createTime: {
            field       : "create_time",
            type        : DataTypes.DATE,
            allowNull   : false,
            defaultValue: DataTypes.NOW,
            comment     : "创建时间"

        }
    }, {
        comment        : "操作日志表"
    });
}