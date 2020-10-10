'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _getUserId = require('../utils/getUserId');

var _getUserId2 = _interopRequireDefault(_getUserId);

var _locales = require('../locales');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Query = {
    me: function me(parent, args, _ref, info) {
        var prisma = _ref.prisma,
            request = _ref.request;

        var userId = (0, _getUserId2.default)(request);

        if (!userId) {
            throw new Error(_locales.locales.errors.authenticationRequired);
        }

        return prisma.query.user({
            where: {
                id: userId
            }
        });
    },
    myPosts: function myPosts(parent, args, _ref2, info) {
        var prisma = _ref2.prisma,
            request = _ref2.request;

        var userId = (0, _getUserId2.default)(request);

        if (!userId) {
            throw new Error(_locales.locales.errors.authenticationRequired);
        }

        var opArgs = {
            after: args.after,
            first: args.first,
            orderBy: args.orderBy,
            skip: args.skip,
            where: {
                author: {
                    id: userId
                }
            }
        };

        if (args.query) {
            opArgs.where.OR = [{
                title_contains: args.query
            }, {
                body_contains: args.query
            }];
        }

        return prisma.query.posts(opArgs, info);
    },
    post: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, args, _ref3, info) {
            var prisma = _ref3.prisma,
                request = _ref3.request;
            var userId, posts;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            userId = (0, _getUserId2.default)(request, false);
                            _context.next = 3;
                            return prisma.query.posts({
                                where: {
                                    id: args.id,
                                    OR: [{
                                        published: true
                                    }, {
                                        author: {
                                            id: userId
                                        }
                                    }]
                                }
                            }, info);

                        case 3:
                            posts = _context.sent;

                            if (!(posts.length === 0)) {
                                _context.next = 6;
                                break;
                            }

                            throw new Error(_locales.locales.errors.postNotFound);

                        case 6:
                            return _context.abrupt('return', posts[0]);

                        case 7:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function post(_x, _x2, _x3, _x4) {
            return _ref4.apply(this, arguments);
        }

        return post;
    }(),
    posts: function posts(parent, args, _ref5, info) {
        var prisma = _ref5.prisma;

        var opArgs = {
            after: args.after,
            first: args.first,
            orderBy: args.orderBy,
            skip: args.skip,
            where: {
                published: true
            }
        };

        if (args.query) {
            opArgs.where.OR = [{
                title_contains: args.query
            }, {
                body_contains: args.query
            }];
        }

        return prisma.query.posts(opArgs, info);
    },
    users: function users(parent, args, _ref6, info) {
        var prisma = _ref6.prisma;

        var opArgs = {
            after: args.after,
            first: args.first,
            orderBy: args.orderBy,
            skip: args.skip
        };

        if (args.query) {
            opArgs.where = {
                OR: [{
                    name_contains: args.query
                }]
            };
        }

        return prisma.query.users(opArgs, info);
    },
    comments: function comments(parent, args, _ref7, info) {
        var prisma = _ref7.prisma;

        var opArgs = {
            after: args.after,
            first: args.first,
            orderBy: args.orderBy,
            skip: args.skip
        };

        return prisma.query.comments(opArgs, info);
    }
};

exports.default = Query;