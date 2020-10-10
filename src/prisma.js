import { Prisma } from 'prisma-binding';
import { fragmentReplacements } from './resolvers/index';

const prisma = new Prisma({
    typeDefs: 'src/__generated__/prisma.graphql',
    endpoint: 'http://localhost:4466',
    secret: 'tempSecret4dev',
    fragmentReplacements,
});

export { prisma as default }