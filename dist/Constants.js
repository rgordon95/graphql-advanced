'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Constants = {
    Global: {
        TOKEN_EXPIRATION: '21 days'
    },
    MutationTypes: {
        CREATED: 'CREATED',
        DELETED: 'DELETED',
        UPDATED: 'UPDATED'
    },
    PasswordRequirements: {
        ILLEGAL_CHARACTERS: 'ILLEGAL CHARACTERS',
        TOO_LONG: 28,
        TOO_SHORT: 8
    }
};

exports.default = Constants;