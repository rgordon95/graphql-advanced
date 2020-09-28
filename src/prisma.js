import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
    typeDefs: 'src/__generated__/prisma.graphql',
    endpoint: 'http://localhost:4466',
});

prisma.exists.Comment({
    id: "ckflx12kb01160833wd7pgc2g"
}).then((res) =>
console.log(res))

const createPostForUser = async (authorId, data) => {
    const post = await prisma.mutation.createPost({
        data: {
            ...data,
            author: {
                connect: {
                   id: authorId
               }
           }
        }
    }, '{ id }')
    const user = await prisma.query.user({
        where: {
            id: authorId
        }
    }, '{ id name email posts { id title published body } } ')
        return user
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

    // createPostForUser("ckflwn3no00rf0833su720yxb", {
    //     title: 'newest post',
    //     body: "the war of art",
    //     published: true
    // }).then((user) => {
    //     console.log(JSON.stringify(user, undefined, 2))
    // })

