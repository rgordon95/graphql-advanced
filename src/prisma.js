import { waitForDebugger } from 'inspector';
import { Prisma } from 'prisma-binding';
import { locales } from './locales';

const prisma = new Prisma({
    typeDefs: 'src/__generated__/prisma.graphql',
    endpoint: 'http://localhost:4466',
});


const createPostForUser = async (authorId, data) => {
    const userExists = await prisma.exists.User({
        id: authorId
    })

    if (!userExists) {
        throw new Error(locales.errors.userNotFound)
    }

    const post = await prisma.mutation.createPost({
        data: {
            ...data,
            author: {
                connect: {
                   id: authorId
               }
           }
        }
    }, '{ id author { name posts { title published } } }')
        return post.author
    }

const updatePostForUser = async (postId, data) => {
    const post = await prisma.mutation.updatePost({
        where: { id: postId }, data
    }, '{ title author { id } }')
    const user = await prisma.query.user({
        where: {
            id: post.author.id
        }
    }, '{ id name posts { id title published body } } ')
    return user
}

//   updatePostForUser("ckflzze5302v60833zkxuk21u", {
//       title: "renassssmed post",
//       published: true
//   }).then((user) => {
//         console.log(JSON.stringify(user, undefined, 2))
//     })

    createPostForUser("ckflwn3no00rf0833su720yxb", {
        title: 'newest post',
        body: "the warasdass of art",
        published: true
    }).then((user) => {
        console.log(JSON.stringify(user, undefined, 2))
    }).catch((error) => {
        console.log(error)
    });

