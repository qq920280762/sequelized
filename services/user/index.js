'use strict';
const PersonService       = require('./PersonService');
const RegisterLogsService = require('./RegisterLogsService');

module.exports = {
    personService      : new PersonService(),
    registerLogsService: new RegisterLogsService()
}