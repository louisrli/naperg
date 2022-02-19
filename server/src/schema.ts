import { Context } from './model/appInterface';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import config from './config';
import { AuthenticationError, UserInputError } from 'apollo-server-errors';
import { rssMutationResolvers } from './resolvers/rss';

export const resolvers = {
  Query: {
    user: (parent, args, ctx: Context) => {
      const { userId } = args;

      if (!userId) throw new Error('Bad request');
      return ctx.prisma.user.findUnique({ where: { id: userId } });
    },
    sources: (parent, args, ctx: Context) => {
      return ctx.prisma.source.findMany()
    },
    sourcePosts: (parent, args, ctx: Context) => {
      const { sourceId } = args;
      return ctx.prisma.post.findMany({ where: { sourceId } })
    },
    sourcePostsPaginated: (parent, args, ctx: Context) => {
      const { sourceId, total, page } = args;
      console.log('No cache in sourcePostsPaginated');

      let offset = 0
      if (page) {
        offset = total * page - total
      }

      return ctx.prisma.post.findMany({
        where: { sourceId },
        skip: offset,
        take: total,
        orderBy: {
          createdAt: 'desc',
        },
      })
    },
    source: async (parent, args, ctx: Context) => {
      const { sourceId } = args;
      return ctx.prisma.source.findUnique({ where: { id: sourceId } })
    },
    post: (parent, args, ctx: Context) => {
      const { postId } = args;
      return ctx.prisma.post.findUnique({ where: { id: postId } })
    },
    userSettings: (parent, args, ctx: Context) => {
      // just for now
      // in future get userId from session
      const { userId } = args;

      if (!userId) throw new Error('Bad request');
      return ctx.prisma.setting.findUnique({ where: { userId } });
    },
  },
  Mutation: {
    addSourceToFeed: async (parent, args, ctx: Context) => {
      const { feedId, sourceId } = args;

      try {
        const relation = await ctx.prisma.sourceFeedRelation.findFirst({
          where: {
            feedId,
            sourceId,
          },
        });

        if (!relation) {
          await ctx.prisma.sourceFeedRelation.create({
            data: {
              feedId,
              sourceId,
            },
          });

          return {
            feedId,
          };
        }
      } catch (error) {
        console.error(error);
        throw new UserInputError(error.message || ':(');
      }
    },

    updateUserSettings: async (parent, args, ctx: Context) => {
      const { userId, theme } = args;

      try {
        const setting = await ctx.prisma.setting.findFirst({
          where: {
            userId,
          },
        });

        if (!setting) {
          throw new UserInputError('Setting not found');
        }

        const newSetting = await ctx.prisma.setting.update({
          where: {
            userId,
          },
          data: {
            ...(theme && { theme }),
          },
        });

        return newSetting;
      } catch (error) {
        console.error(error);
        throw new UserInputError(error.message || ':(');
      }
    },
    ...rssMutationResolvers,
  },
};
