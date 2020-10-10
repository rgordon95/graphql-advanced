import getUserId from '../utils/getUserId';
import { locales } from '../locales';

const Query = {
    me(parent, args, { prisma, request }, info ) {
        const userId = getUserId(request);

        if (!userId) {
            throw new Error(locales.errors.authenticationRequired);
        }

        return prisma.query.user({
            where: {
                id: userId
            }
        })
    },
    myPosts(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);

        if (!userId) {
            throw new Error(locales.errors.authenticationRequired);
        }

        const opArgs = {
            where: {
                author: {
                    id: userId
                }
            }
        }

        if (args.query) {
            opArgs.where.OR = [{
                title_contains: args.query
            }, {
                body_contains: args.query
            }]

            }


        return prisma.query.posts(opArgs, info);
    },
    async post(parent, args, { prisma, request }, info) {
        const userId = getUserId(request, false);

        const posts = await prisma.query.posts({
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
         }, info)

         if (posts.length === 0) {
             throw new Error(locales.errors.postNotFound);
         }

         return posts[0];
    },
    posts(parent, args, { prisma }, info) {
        const opArgs = {
            after: args.after,
            first: args.first,
            skip: args.skip,
            where: {
                published: true
            },
        }

            if (args.query) {
                opArgs.where.OR = [{
                    title_contains: args.query
                }, {
                    body_contains: args.query
                }]
            }

        return prisma.query.posts(opArgs, info);
    },

    users(parent, args, { prisma }, info) {
const opArgs = {
    after: args.after,
    first: args.first,
    skip: args.skip,
}

if (args.query) {
    opArgs.where = {
            OR: [{
                name_contains: args.query
            }]
        }
    }

return prisma.query.users(opArgs, info)
},
comments(parent, args, { prisma }, info) {
  return prisma.query.comments(null, info)
},
};

export { Query as default };