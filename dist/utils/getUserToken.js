'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.default = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _locales = require('../locales');

var _Constants = require('../Constants');

var _Constants2 = _interopRequireDefault(_Constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getUserToken = function getUserToken(userId) {

   return _jsonwebtoken2.default.sign({ userId: userId }, 'tempDevSecret', { expiresIn: _Constants2.default.Global.TOKEN_EXPIRATION });
};

exports.default = getUserToken;