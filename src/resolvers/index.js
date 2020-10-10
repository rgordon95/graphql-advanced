import { extractFragmentReplacements } from 'prisma-binding';
import Query from './Query';
import Mutation from './Mutation';
import Subscription from './Subscription';
import Comment from './Comment';
import Post from './Post';
import User from './User';

const resolvers = {
    Query,
    Mutation,
    Subscription,
    Comment,
    Post,
    User
}

const fragmentReplacements = extractFragmentReplacements(resolvers)


export { resolvers, fragmentReplacements }