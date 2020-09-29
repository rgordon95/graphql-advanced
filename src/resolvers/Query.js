import prisma from '../prisma';

const Query = {
    me() {
        return {
            id: 'qijioa',
            name: 'Richard',
            email: 'rich@mail.com',
            age: '25',
        }
    },
    post() {
         return {
            title: 'titlee',
            body: 'first post',
            published: true,
            id: '1',
            author: '1',
       }
    },
    posts(parent, args, { prisma }, info) {
        const opArgs = {}

            if (args.query) {
                opArgs.where = {
                    OR: [{
                        title_contains: args.query
                    }, {
                        body_contains: args.query
                    }]
                }
            }


        return prisma.query.posts(null, info);
},
users(parent, args, { prisma }, info) {
const opArgs = {}

if (args.query) {
    opArgs.where = {
            OR: [{
                name_contains: args.query
            }, {
                email_contains: args.query
            }]
        }
    }

return prisma.query.users(opArgs, info)
},
comments(parent, args, { prisma }, info) {
    const opArgs = {}
  return prisma.query.comments(opArgs, info)
},
};

export { Query as default };