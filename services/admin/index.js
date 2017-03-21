'use strict';
const AccountApplicationService = require('./AccountApplicationService');
const AccountRoleService        = require('./AccountRoleService');
const AccountService            = require('./AccountService');
const ApplicationService        = require('./ApplicationService');
const ButtonService             = require('./ButtonService');
const EditLogsService           = require('./EditLogsService');
const LoginLogsService          = require('./LoginLogsService');
const MenuService               = require('./MenuService');
const PrivilegeService          = require('./PrivilegeService');
const RoleService               = require('./RoleService');


module.exports = {
    accountApplicationService: AccountApplicationService,
    accountRoleService       : AccountRoleService,
    accountService           : AccountService,
    applicationService       : ApplicationService,
    buttonService            : ButtonService,
    editLogsService          : EditLogsService,
    loginLogsService         : LoginLogsService,
    menuService              : MenuService,
    privilegeService         : PrivilegeService,
    roleService              : RoleService
}