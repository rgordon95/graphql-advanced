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
createPost(parent, args, { db, pubsub }, info) {
    const userExists = db.users.some((user) => user.id === args.data.author)

    if (!userExists) {
        throw new Error(locales.errors.userNotFound)
    }

    const post = {
        id: uuidv4(),
       ...args.data,
    };

    db.posts.push(post);

    if (args.data.published) {
        pubsub.publish('post', {
            post: {
                mutation: Constants.MutationTypes.CREATED,
                data: post
            }
        });
    }
    
    return post;
},
deletePost(parents, args, { db, pubsub }, info) {
    const postIndex = db.posts.findIndex((post) => post.id === args.id);

    if (postIndex === -1) {
        throw new Error(locales.errors.postNotFound);
    }

    const [post] = db.posts.splice(postIndex, 1);

    db.comments = db.comments.filter((comment) => comment.post !== args.id)

    if (post.published) {
        pubsub.publish('post', {
            post: {
                mutation: Constants.MutationTypes.DELETED,
                data: post
            }
        });
    }

    return post;

},
updatePost(parents, { id, data }, { db, pubsub }, info ) {
    const post = db.posts.find((post) => post.id === id)
    const originalPost = { ...post }

    if (!post) {
        throw new Error(locales.errors.postNotFound);
    }

    if (typeof data.title === 'string') {
        post.title = data.title
    }
    
    if (typeof data.body === 'string') {
        post.body = data.body
    }

    if (typeof data.published === 'boolean') {
        post.published = data.published

        if (originalPost.published && !post.published) {
            pubsub.publish('post', {
                post: {
                    mutation: Constants.MutationTypes.DELETED,
                    data: originalPost
                }
            })
        } else if (!originalPost.published && post.published) {
            pubsub.publish('post', {
                post: {
                    mutation: Constants.MutationTypes.CREATED,
                    data: post
                }
            })
        }
    } else if (post.published) {
        pubsub.publish('post', {
            post: {
                mutation: Constants.MutationTypes.UPDATED,
                data: post
            }
        })
    }


    return post
},
createComment(parent, args, { db, pubsub }, info) {
    const userExists = db.users.some((user) => user.id === args.data.author);
    const postExists = db.posts.some((post) => {
        return post.id === args.data.post && post.published;
    });

    if (!userExists) {
        throw new Error(locales.errors.userNotFound);
    }

    if (!postExists) {
        throw new Error(locales.errors.postNotFound);
    }
    
    const comment = {
        id: uuidv4(),
        body: args.data.body,
        author: args.data.author,
        post: args.data.post,
    }

    db.comments.push(comment);
    pubsub.publish(`comment ${args.data.post}`, {
     mutation: Constants.MutationTypes.CREATED,
     data: comment   
    });

    return comment;

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
updateComment(parent, args, { db, pubsub }, info ) {
    const { id, body } = args;
    const comment = db.comments.find((comment) => comment.id === id)

    if (!comment) {
        throw new Error(locales.errors.commentNotFound)
    }

    if (typeof body === 'string') {
        comment.body = body
    }

    db.comments.push(comment);
    pubsub.publish(`comment ${comment.post}`, {
     mutation: Constants.MutationTypes.UPDATED,
     data: comment   
    });

    return comment
},
};

export { Mutation as default }