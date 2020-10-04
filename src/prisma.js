import { Prisma } from 'prisma-binding';
import { locales } from './locales';

const prisma = new Prisma({
    typeDefs: 'src/__generated__/prisma.graphql',
    endpoint: 'http://localhost:4466',
    secret: 'tempSecret4dev',
});

export { prisma as default }