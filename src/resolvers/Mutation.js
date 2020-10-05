import { locales } from '../locales';
import { Constants } from '../constants';
const Mutation = {
async createUser(parent, args, { prisma }, info) {
   // optional checks for more clear error mesaging, can optionally use prismas built in
    const emailTaken  = await prisma.exists.User({ email: args.data.email })

     if (emailTaken) {
        throw new Error(locales.errors.emailInUse)
    }

    if (args.data.password.length < Constants.PasswordRequirements.TOO_SHORT ) {
        throw new Error(locales.errors.passwordTooShort)
    }

    if (args.data.password.length > Constants.PasswordRequirements.TOO_LONG ) {
        throw new Error(locales.errors.passwordTooLong)
    }

    return prisma.mutation.createUser({ data: args.data }, info)
},
async deleteUser(parent, args, { prisma }, info) {
    return prisma.mutation.deleteUser({ where: { id: args.id, }, info })
},
async updateUser(parent, args, { prisma }, info) {
   return prisma.mutation.updateUser({
        where: {
            id: args.id,
        },
        data: args.data
    }, info)
},
createPost(parent, args, { prisma }, info) {
    return prisma.mutation.createPost({
        data: {
            title: args.data.title, 
            body: args.data.body, 
            published: args.data.published,
            author: {
                connect: {
                    id: args.data.author, 
                }
            },
       }
    }, info);
},
async deletePost(parents, args, { prisma }, info) {
    return prisma.mutation.deletePost({ where: { id: args.id }, info});
},
async updatePost(parents, { id, data }, { prisma }, info ) {
    return prisma.mutation.updatePost({
        where: {
            id: id,
        },
        data: data
    }, info)
},
async createComment(parent, args, { prisma }, info) {
   return prisma.mutation.createComment({
       data: {
           body: args.data.body,
           author: {
               connect: {
                   id: args.data.author
               }
           },
           post: {
               connect: {
                       id: args.data.post
                   }
           }
       },
   }, info)
},
deleteComment(parent, args, { prisma }, info) {
   return prisma.mutation.deleteComment({
       where: {
           id: args.id
       }
   }, info)
},
updateComment(parent, args, { prisma }, info ) {    
    return prisma.mutation.updateComment({
        where: {
            id: args.id,
        },
        data:  args.data
    }, info)
  },
};

export { Mutation as default }