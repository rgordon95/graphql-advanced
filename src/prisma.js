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
    const postExists = await prisma.exists.Post({
        id: postId
    })

    if (!postExists) {
        throw new Error(locales.errors.postNotFound)
    }

    const post = await prisma.mutation.updatePost({
        where: { id: postId }, data
    }, '{ author { id name email  posts { id title published} } }')
  
    return post.author
}

//   updatePostForUser("ckflwbbcp00jo08336j4jlup9", {
//       title: "update post",
//       published: false
//   }).then((post) => {
//         console.log(JSON.stringify(post, undefined, 2))
//     }).catch((error) => {
//         console.log(error)
//     });


//     createPostForUser("ckflwn3no00rf0833su720yxb", {
//         title: 'newest post',
//         body: "the warasdass of art",
//         published: true
//     }).then((user) => {
//         console.log(JSON.stringify(user, undefined, 2))
//     }).catch((error) => {
//         console.log(error)
//     });

