'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _getHashedPassword = require('../utils/getHashedPassword');

var _getHashedPassword2 = _interopRequireDefault(_getHashedPassword);

var _getUserId = require('../utils/getUserId');

var _getUserId2 = _interopRequireDefault(_getUserId);

var _getUserToken = require('../utils/getUserToken');

var _getUserToken2 = _interopRequireDefault(_getUserToken);

var _Constants = require('../Constants');

var _Constants2 = _interopRequireDefault(_Constants);

var _locales = require('../locales');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Mutation = {
    createUser: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, args, _ref, info) {
            var prisma = _ref.prisma;
            var emailTaken, password, user;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return prisma.exists.User({ email: args.data.email });

                        case 2:
                            emailTaken = _context.sent;

                            if (!emailTaken) {
                                _context.next = 5;
                                break;
                            }

                            throw new Error(_locales.locales.errors.emailInUse);

                        case 5:
                            _context.next = 7;
                            return (0, _getHashedPassword2.default)(args.data.password);

                        case 7:
                            password = _context.sent;
                            user = prisma.mutation.createUser({
                                data: _extends({}, args.data, {
                                    password: password
                                })
                            });
                            return _context.abrupt('return', {
                                user: user,
                                token: (0, _getUserToken2.default)(user.id)
                            });

                        case 10:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function createUser(_x, _x2, _x3, _x4) {
            return _ref2.apply(this, arguments);
        }

        return createUser;
    }(),
    deleteUser: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(parent, args, _ref3, info) {
            var prisma = _ref3.prisma,
                request = _ref3.request;
            var userId;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            userId = (0, _getUserId2.default)(request);
                            return _context2.abrupt('return', prisma.mutation.deleteUser({ where: { id: userId }, info: info }));

                        case 2:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        function deleteUser(_x5, _x6, _x7, _x8) {
            return _ref4.apply(this, arguments);
        }

        return deleteUser;
    }(),
    loginUser: function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(parent, args, _ref5, info) {
            var prisma = _ref5.prisma;
            var user, isCorrectPassword;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return prisma.query.user({
                                where: {
                                    email: args.data.email
                                }
                            });

                        case 2:
                            user = _context3.sent;

                            if (user) {
                                _context3.next = 5;
                                break;
                            }

                            throw new Error(_locales.locales.errors.emailNotFound);

                        case 5:
                            _context3.next = 7;
                            return _bcryptjs2.default.compare(args.data.password, user.password);

                        case 7:
                            isCorrectPassword = _context3.sent;

                            if (isCorrectPassword) {
                                _context3.next = 10;
                                break;
                            }

                            throw new Error(_locales.locales.errors.userPasswordComboIncorrect);

                        case 10:
                            return _context3.abrupt('return', {
                                user: user,
                                token: (0, _getUserToken2.default)(user.id)
                            });

                        case 11:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        }));

        function loginUser(_x9, _x10, _x11, _x12) {
            return _ref6.apply(this, arguments);
        }

        return loginUser;
    }(),
    updateUser: function () {
        var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(parent, args, _ref7, info) {
            var prisma = _ref7.prisma,
                request = _ref7.request;
            var userId;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            userId = (0, _getUserId2.default)(request);

                            if (!(typeof args.data.password === 'string')) {
                                _context4.next = 5;
                                break;
                            }

                            _context4.next = 4;
                            return (0, _getHashedPassword2.default)(args.data.password);

                        case 4:
                            args.data.password = _context4.sent;

                        case 5:
                            return _context4.abrupt('return', prisma.mutation.updateUser({
                                where: {
                                    id: userId
                                },
                                data: args.data
                            }, info));

                        case 6:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, this);
        }));

        function updateUser(_x13, _x14, _x15, _x16) {
            return _ref8.apply(this, arguments);
        }

        return updateUser;
    }(),
    createPost: function createPost(parent, args, _ref9, info) {
        var prisma = _ref9.prisma,
            request = _ref9.request;

        var userId = (0, _getUserId2.default)(request);
        return prisma.mutation.createPost({
            data: {
                title: args.data.title,
                body: args.data.body,
                published: args.data.published,
                author: {
                    connect: {
                        id: userId
                    }
                }
            }
        }, info);
    },
    deletePost: function () {
        var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(parents, args, _ref10, info) {
            var prisma = _ref10.prisma,
                request = _ref10.request;
            var userId, postExists;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            userId = (0, _getUserId2.default)(request);
                            _context5.next = 3;
                            return prisma.exists.Post({
                                id: args.id,
                                author: {
                                    id: userId
                                }
                            });

                        case 3:
                            postExists = _context5.sent;

                            if (userId) {
                                _context5.next = 6;
                                break;
                            }

                            throw new Error(_locales.locales.errors.authenticationRequired);

                        case 6:
                            if (postExists) {
                                _context5.next = 8;
                                break;
                            }

                            throw new Error(_locales.locales.errors.postNotFound);

                        case 8:
                            return _context5.abrupt('return', prisma.mutation.deletePost({
                                where: {
                                    id: args.id
                                }
                            }, info));

                        case 9:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, this);
        }));

        function deletePost(_x17, _x18, _x19, _x20) {
            return _ref11.apply(this, arguments);
        }

        return deletePost;
    }(),
    updatePost: function () {
        var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(parents, _ref12, _ref13, info) {
            var id = _ref12.id,
                data = _ref12.data;
            var prisma = _ref13.prisma,
                request = _ref13.request;
            var userId, postExists, isPublished;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            userId = (0, _getUserId2.default)(request);
                            _context6.next = 3;
                            return prisma.exists.Post({
                                id: args.id,
                                published: published,
                                author: {
                                    id: userId
                                }
                            });

                        case 3:
                            postExists = _context6.sent;

                            if (userId) {
                                _context6.next = 6;
                                break;
                            }

                            throw new Error(_locales.locales.errors.authenticationRequired);

                        case 6:
                            if (postExists) {
                                _context6.next = 8;
                                break;
                            }

                            throw new Error(_locales.locales.errors.postNotFound);

                        case 8:
                            _context6.next = 10;
                            return prisma.exists.Post({
                                id: args.id,
                                published: published
                            });

                        case 10:
                            isPublished = _context6.sent;

                            if (!(isPublished && args.data.published === false)) {
                                _context6.next = 14;
                                break;
                            }

                            _context6.next = 14;
                            return prisma.mutation.deleteManyComments({
                                where: {
                                    post: {
                                        id: args.id
                                    }
                                }
                            });

                        case 14:
                            return _context6.abrupt('return', prisma.mutation.updatePost({
                                where: {
                                    id: id
                                },
                                data: data
                            }, info));

                        case 15:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, this);
        }));

        function updatePost(_x21, _x22, _x23, _x24) {
            return _ref14.apply(this, arguments);
        }

        return updatePost;
    }(),
    createComment: function () {
        var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(parent, args, _ref15, info) {
            var prisma = _ref15.prisma,
                request = _ref15.request;
            var userId, postExists;
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            userId = (0, _getUserId2.default)(request);
                            _context7.next = 3;
                            return prisma.exists.Post({
                                id: args.data.id,
                                published: published
                            });

                        case 3:
                            postExists = _context7.sent;

                            if (userId) {
                                _context7.next = 6;
                                break;
                            }

                            throw new Error(_locales.locales.errors.authenticationRequired);

                        case 6:
                            if (!(!postExists || !published)) {
                                _context7.next = 8;
                                break;
                            }

                            throw new Error(_locales.locales.errors.postNotFound);

                        case 8:
                            return _context7.abrupt('return', prisma.mutation.createComment({
                                data: {
                                    body: args.data.body,
                                    author: {
                                        connect: {
                                            id: userId
                                        }
                                    },
                                    post: {
                                        connect: {
                                            id: args.data.post
                                        }
                                    }
                                }
                            }, info));

                        case 9:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, this);
        }));

        function createComment(_x25, _x26, _x27, _x28) {
            return _ref16.apply(this, arguments);
        }

        return createComment;
    }(),
    deleteComment: function () {
        var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(parent, args, _ref17, info) {
            var prisma = _ref17.prisma,
                request = _ref17.request;
            var userId, commentExists;
            return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            userId = (0, _getUserId2.default)(request);
                            _context8.next = 3;
                            return prisma.exists.Comment({
                                id: args.id,
                                author: {
                                    id: userId
                                }
                            });

                        case 3:
                            commentExists = _context8.sent;

                            if (userId) {
                                _context8.next = 6;
                                break;
                            }

                            throw new Error(_locales.locales.errors.authenticationRequired);

                        case 6:
                            if (commentExists) {
                                _context8.next = 8;
                                break;
                            }

                            throw new Error(_locales.locales.errors.commentNotFound);

                        case 8:
                            return _context8.abrupt('return', prisma.mutation.deleteComment({
                                where: {
                                    id: args.id
                                }
                            }, info));

                        case 9:
                        case 'end':
                            return _context8.stop();
                    }
                }
            }, _callee8, this);
        }));

        function deleteComment(_x29, _x30, _x31, _x32) {
            return _ref18.apply(this, arguments);
        }

        return deleteComment;
    }(),
    updateComment: function () {
        var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(parent, args, _ref19, info) {
            var prisma = _ref19.prisma,
                request = _ref19.request;
            var userId, commentExists;
            return regeneratorRuntime.wrap(function _callee9$(_context9) {
                while (1) {
                    switch (_context9.prev = _context9.next) {
                        case 0:
                            userId = (0, _getUserId2.default)(request);
                            _context9.next = 3;
                            return prisma.exists.Comment({
                                id: args.id,
                                author: {
                                    id: userId
                                }
                            });

                        case 3:
                            commentExists = _context9.sent;

                            if (userId) {
                                _context9.next = 6;
                                break;
                            }

                            throw new Error(_locales.locales.errors.authenticationRequired);

                        case 6:
                            if (commentExists) {
                                _context9.next = 8;
                                break;
                            }

                            throw new Error(_locales.locales.errors.commentNotFound);

                        case 8:
                            return _context9.abrupt('return', prisma.mutation.updateComment({
                                where: {
                                    id: args.id
                                },
                                data: args.data
                            }, info));

                        case 9:
                        case 'end':
                            return _context9.stop();
                    }
                }
            }, _callee9, this);
        }));

        function updateComment(_x33, _x34, _x35, _x36) {
            return _ref20.apply(this, arguments);
        }

        return updateComment;
    }()
};

exports.default = Mutation;