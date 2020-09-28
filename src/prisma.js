import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
    typeDefs: 'src/__generated__/prisma.graphql',
    endpoint: 'http://localhost:4466',
});


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

  updatePostForUser("ckflzze5302v60833zkxuk21u", {
      title: "renassssmed post",
      published: true
  }).then((user) => {
        console.log(JSON.stringify(user, undefined, 2))
    })

    // createPostForUser("ckflwn3no00rf0833su720yxb", {
    //     title: 'newest post',
    //     body: "the war of art",
    //     published: true
    // }).then((user) => {
    //     console.log(JSON.stringify(user, undefined, 2))
    // })


// prisma.mutation.updatePost({
//     data: {
//         title: "changed title",
//         body: "H",
//         published: true,
//     }, where: { id: "ckflzcbbn02fq0833rifd3zi0"}
// }, '{ id title body published } ').then((data) => {
//     return prisma.query.posts(null, ' { id title body published author { name } } ').then((data) => {
//         console.log(JSON.stringify(data, undefined, 2))

//     })
// })