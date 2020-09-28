import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
    typeDefs: 'src/__generated__/prisma.graphql',
    endpoint: 'http://localhost:4466',
});


prisma.query.users(null, '{ id name email posts { id title} }').then((data) => {
console.log(JSON.stringify(data, undefined, 2));
});

// prisma.query.comments(null, '{ id body author { name } }').then((data) => {
//     console.log(JSON.stringify(data, undefined, 2))
// });

prisma.mutation.createPost({
    data: {
        title: "my new graphql post",
        body: "here is my body text",
        published: true,
        author: {
            connect: {
                id: "ckflwn3no00rf0833su720yxb"
            }
        }
    }
}, '{ id title body published }').then((data) => {
    console.log(JSON.stringify(data, undefined, 2))
});