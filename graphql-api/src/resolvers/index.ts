import { GraphQLError } from 'graphql';
import type { MutationResolvers, QueryResolvers, Resolvers } from '../generated/types';
import type { RequestContext } from '../types';

function requireToken(context: RequestContext): string {
    const token = context.jwt?.token?.value;
    if (!token) {
        throw new GraphQLError('UNAUTHENTICATED', { extensions: { code: 'UNAUTHENTICATED' } });
    }
    return token;
}

const Query: QueryResolvers = {
    publishedRecipes: async (_parent, args, ctx) => {
        return ctx.services.recipes.publishedRecipes(args.filters ?? null);
    },
    recipe: async (_parent, args, ctx) => {
        const token = ctx.jwt?.token?.value ?? null;
        return ctx.services.recipes.recipe(args.id, token);
    },
    myRecipes: async (_parent, _args, ctx) => {
        return ctx.services.recipes.myRecipes(requireToken(ctx));
    },
    mySavedRecipes: async (_parent, _args, ctx) => {
        return ctx.services.recipes.mySavedRecipes(requireToken(ctx));
    },
};

const Mutation: MutationResolvers = {
    createRecipe: async (_parent, args, ctx) => {
        return ctx.services.recipes.createRecipe(args.input, requireToken(ctx));
    },
    updateRecipe: async (_parent, args, ctx) => {
        return ctx.services.recipes.updateRecipe(args.id, args.input, requireToken(ctx));
    },
    deleteRecipe: async (_parent, args, ctx) => {
        return ctx.services.recipes.deleteRecipe(args.id, requireToken(ctx));
    },
    favoriteRecipe: async (_parent, args, ctx) => {
        return ctx.services.recipes.favoriteRecipe(args.id, requireToken(ctx));
    },
    unfavoriteRecipe: async (_parent, args, ctx) => {
        return ctx.services.recipes.unfavoriteRecipe(args.id, requireToken(ctx));
    },
};

const resolvers = {
    Query,
    Mutation,
} as Resolvers<RequestContext>;

export default resolvers;
