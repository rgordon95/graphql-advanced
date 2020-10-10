import { Prisma } from 'prisma-binding';
import { fragmentReplacements } from './resolvers/index';

const prisma = new Prisma({
    typeDefs: 'src/__generated__/prisma.graphql',
    endpoint: process.env.PRISMA_ENDPOINT,
    secret: 'tempSecret4dev',
    fragmentReplacements,
});

export { prisma as default }