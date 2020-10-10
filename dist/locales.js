'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.locales = undefined;

var _Constants = require('./Constants');

var _Constants2 = _interopRequireDefault(_Constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var locales = exports.locales = {
    errors: {
        authenticationRequired: 'you must login to perform this action',
        emailInUse: 'email in use. Try logging in instead',
        emailNotFound: 'email not found. Please create an account',
        commentNotFound: "sorry, this comment has been removed or never existed",
        postNotFound: 'sorry, this post no longer exists.',
        passwordTooShort: 'Sorry, your password must be longer ',
        userNotFound: 'user not found.',
        userPasswordComboIncorrect: 'wrong email or password'
    },
    logs: {
        initialized: 'graphql initialized!',
        initializing: 'graphql initializing...'
    }
};