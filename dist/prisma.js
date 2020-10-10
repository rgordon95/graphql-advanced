'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _prismaBinding = require('prisma-binding');

var _index = require('./resolvers/index');

var prisma = new _prismaBinding.Prisma({
    typeDefs: 'src/__generated__/prisma.graphql',
    endpoint: process.env.PRISMA_ENDPOINT,
    secret: 'tempSecret4dev',
    fragmentReplacements: _index.fragmentReplacements
});

exports.default = prisma;