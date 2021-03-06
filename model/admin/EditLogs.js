'use strict';

module.exports = function(sequelize,DataTypes) {
    return sequelize.define('edit_logs', {
        id: {
            field:"editLogs_id",
            type         : DataTypes.INTEGER(11).UNSIGNED,
            allowNull    : false,
            unique       : 'id_UNIQUE',
            primaryKey   : true,
            autoIncrement: true,
            comment      : "编辑日志ID"
        },
        accountId      : {
            field    : "account_id",
            type     : DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            comment  : "用户ID"
        },
        description  : {
            field:"description",
            type     : DataTypes.STRING(100),
            allowNull: false,
            comment     : "日志描述"
        },
        logInfo   : {
            field:"log_info",
            type     : DataTypes.STRING(5000),
            allowNull: false,
            comment     : "日志详情"
        },
        affectLevel   : {
            field       : "affect_level",
            type        : DataTypes.ENUM,
            values      : ["0", "1", "2"],
            allowNull   : false,
            defaultValue: '0',
            comment     : "影响级别 0低 1中 2高"
        },
        device : {
            field    : "device",
            type     : DataTypes.STRING(45),
            allowNull: false,
            comment     : "设备号"
        },
        deviceType     : {
            field       : "device_type",
            type        : DataTypes.ENUM,
            values      : ["0", "1", "2"],
            allowNull   : false,
            defaultValue: '0',
            comment     : "设备类型 0电脑 1:手机 2平板"

        },
        ipAddress     : {
            field       : "ip_address",
            type        : DataTypes.STRING(15),
            allowNull   : false,
            defaultValue: '',
            comment     : "IP地址"

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