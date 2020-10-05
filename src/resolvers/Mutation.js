import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import getUserId from '../utils/getUserId';
import { locales } from '../locales';
import { Constants } from '../constants';

const Mutation = {
async createUser(parent, args, { prisma }, info) {
   // optional checks for more clear error mesaging, can optionally use prismas built in
    const emailTaken  = await prisma.exists.User({ email: args.data.email })

     if (emailTaken) {
        throw new Error(locales.errors.emailInUse)
    }

    if (args.data.password.length < 8 ) { // replace with constant
        throw new Error(locales.errors.passwordTooShort)
    }

    // if (args.data.password.length > Constants.PasswordRequirements.TOO_LONG ) {
    //     throw new Error(locales.errors.passwordTooLong)
    // }

    const password = await bcrypt.hash(args.data.password, 16)

    const user =  prisma.mutation.createUser({ 
        data: {
            ...args.data,
            password,
        }
        
    })

    return {
        user,
        token: jwt.sign({ userId: user.id }, 'tempDevSecret')
    }
},
async deleteUser(parent, args, { prisma }, info) {
    return prisma.mutation.deleteUser({ where: { id: args.id, }, info })
},
async loginUser(parent, args, { prisma }, info ) {

    const user  = await prisma.query.user({ 
        where: {
            email: args.data.email 
        }
    })

    if (!user) {
        throw new Error(locales.errors.emailNotFound)
    }

    const isCorrectPassword = await bcrypt.compare(args.data.password, user.password);

    if (!isCorrectPassword) {
        throw new Error(locales.errors.userPasswordComboIncorrect)
    }

    return { 
        user,
        token: jwt.sign({ userId: user.id}, 'tempDevSecret')
    }
},
async updateUser(parent, args, { prisma }, info) {
   return prisma.mutation.updateUser({
        where: {
            id: args.id,
        },
        data: args.data
    }, info)
},
createPost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.mutation.createPost({
        data: {
            title: args.data.title, 
            body: args.data.body, 
            published: args.data.published,
            author: {
                connect: {
                    id: userId, 
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