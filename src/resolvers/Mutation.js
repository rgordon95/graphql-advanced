import uuidv4 from 'uuid/v4';
import { locales } from '../locales';
import { Constants } from '../constants';

const Mutation = {
async createUser(parent, args, { prisma }, info) {
   // optional checks for more clear error mesaging, can optionally use prismas built in
    const emailTaken  = await prisma.exists.User({ email: args.data.email })

     if (emailTaken) {
        throw new Error(locales.errors.emailInUse)
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
deleteComment(parent, args, { db, pubsub }, info) {
    const commentIndex = db.comments.findIndex((comment) => comment.id === args.id);

    if (commentIndex === -1) {
        throw new Error(locales.errors.commentNotFound);
    }

    const deletedComment = db.comments.splice(commentIndex, 1);


    db.comments.push(comment);
    pubsub.publish(`comment ${deletedComment[0].post}`, {
     mutation: Constants.MutationTypes.DELETED,
     data: comment   
    });

    return deletedComment[0];
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