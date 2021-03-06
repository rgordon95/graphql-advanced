import bcrypt from 'bcryptjs';

import getHashedPassword from '../utils/getHashedPassword';
import getUserId from '../utils/getUserId';
import getUserToken from '../utils/getUserToken';
import Constants from '../Constants';
import { locales } from '../locales';


const Mutation = {
async createUser(parent, args, { prisma }, info) {
   // optional checks for more clear error mesaging, can optionally use prismas built in
    const emailTaken  = await prisma.exists.User({ email: args.data.email })

     if (emailTaken) {
        throw new Error(locales.errors.emailInUse)
    }

    const password = await getHashedPassword(args.data.password)

    const user =  prisma.mutation.createUser({ 
        data: {
            ...args.data,
            password,
        }
    })

    return {
        user,
        token: getUserToken(user.id)
    }
},
async deleteUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.mutation.deleteUser({ where: { id: userId }, info })
},
async loginUser(parent, args, { prisma }, info ) {
    const user = await prisma.query.user({ 
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
        token: getUserToken(user.id)
    }
},
async updateUser(parent, { where: { id } }, { prisma, request }, info) { // TODO: FIX IN PROD
   const userId = getUserId(request);
   console.log('mutation log : ', userId)
   if (typeof args.data.password === 'string') {
    args.data.password = await getHashedPassword(args.data.password)
   }

   return prisma.mutation.updateUser({
        where: {
            id: userId
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
            }
       }
    }, info);
},
async deletePost(parents, args, { prisma, request }, info) {
    const userId = getUserId(request);
    const postExists = await prisma.exists.Post({
        id: args.id,
        author: {
            id: userId,
        }
    })

    if (!userId) {
        throw new Error(locales.errors.authenticationRequired);
    }

    if (!postExists) {
        throw new Error(locales.errors.postNotFound);
    }

    return prisma.mutation.deletePost({ 
        where: { 
            id: args.id 
        }
    }, info
  )
},
async updatePost(parents, { id, data }, { prisma, request }, info ) {
    const userId = getUserId(request);

    const postExists = await prisma.exists.Post({
        id: args.id,
        published,
        author: {
            id: userId,
        }
    })

    if (!userId) {
        throw new Error(locales.errors.authenticationRequired);
    }

    if (!postExists) {
        throw new Error(locales.errors.postNotFound);
    }


    const isPublished = await prisma.exists.Post({
        id: args.id,
        published
    })

    if (isPublished && args.data.published === false) {
        await prisma.mutation.deleteManyComments({
            where: {
                post: {
                    id: args.id
                }
            }
        })
    }

    return prisma.mutation.updatePost({
        where: {
            id,
        },
        data,
    }, info)
},
 async createComment(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    const postExists = await prisma.exists.Post({
        id: args.data.id,
        published,
    })

    if (!userId) {
        throw new Error(locales.errors.authenticationRequired);
    }

    if (!postExists || !published) {
        throw new Error(locales.errors.postNotFound);
    }

   return prisma.mutation.createComment({
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
       },
   }, info)
},
async deleteComment(parent, args, { prisma, request }, info) {    
    const userId = getUserId(request);

    const commentExists = await prisma.exists.Comment({
        id: args.id,
        author: {
            id: userId,
        }
    })

    if (!userId) {
        throw new Error(locales.errors.authenticationRequired);
    }

    if (!commentExists) {
        throw new Error(locales.errors.commentNotFound);
    }

   return prisma.mutation.deleteComment({
       where: {
           id: args.id
       }
   }, info)
},
async updateComment(parent, args, { prisma, request }, info ) {    
    const userId = getUserId(request);

    const commentExists = await prisma.exists.Comment({
        id: args.id,
        author: {
            id: userId,
        }
    })

    if (!userId) {
        throw new Error(locales.errors.authenticationRequired);
    }

    if (!commentExists) {
        throw new Error(locales.errors.commentNotFound);
    }

    return prisma.mutation.updateComment({
        where: {
            id: args.id,
        },
        data:  args.data
    }, info)
  }
};

export { Mutation as default }