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
    accountApplicationService: new AccountApplicationService(),
    accountRoleService       : new AccountRoleService(),
    accountService           : new AccountService(),
    applicationService       : new ApplicationService(),
    buttonService            : new ButtonService(),
    editLogsService          : new EditLogsService(),
    loginLogsService         : new LoginLogsService(),
    menuService              : new MenuService(),
    privilegeService         : new PrivilegeService(),
    roleService              : new RoleService()
}