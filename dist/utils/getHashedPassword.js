'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _Constants = require('../Constants');

var _Constants2 = _interopRequireDefault(_Constants);

var _locales = require('../locales');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getHashedPassword = function getHashedPassword(password) {

    if (password.length < _Constants2.default.PasswordRequirements.TOO_SHORT) {
        throw new Error(_locales.locales.errors.passwordTooShort);
    }

    if (password.length > _Constants2.default.PasswordRequirements.TOO_LONG) {
        throw new Error(_locales.locales.errors.passwordTooLong);
    }

    return _bcryptjs2.default.hash(password, 16);
};

exports.default = getHashedPassword;