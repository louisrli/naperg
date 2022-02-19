import { Context } from './model/appInterface';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import config from './config';
import { AuthenticationError, UserInputError } from 'apollo-server-errors';
import { rssMutationResolvers } from './resolvers/rss';

const COUNT_OF_HEADLINES = 10

export const resolvers = {
  Query: {
    user: async (parent, args, ctx: Context) => {
      const [user] = await ctx.prisma.user.findMany({
        skip: 0,
        take: 1,
      });
      // this solution allows us to take only first user
      return user
    },
    sources: (parent, args, ctx: Context) => {
      return ctx.prisma.source.findMany()
    },
    headlines: async (parent, args, ctx: Context) => {
      const headlines = await ctx.prisma.headline.findMany({
        skip: 0,
        take: COUNT_OF_HEADLINES,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          post: {
            include: {
              source: true,
            },
          }
        }
      })

      return headlines.map(el => el.post)

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
        include: {
          source: true,
        },
      })
    },
    source: async (parent, args, ctx: Context) => {
      const { sourceId } = args;
      return ctx.prisma.source.findUnique({ where: { id: sourceId } })
    },
    post: (parent, args, ctx: Context) => {
      const { postId } = args;
      return ctx.prisma.post.findUnique({
        where: { id: postId },
        include: {
          source: true,
        }
      })
    },
    userSettings: async (parent, args, ctx: Context) => {

      const user = await ctx.prisma.user.findMany({
        skip: 0,
        take: 1,
      });

      // @ts-ignore
      return ctx.prisma.setting.findUnique({ where: { userId: user[0].id } });
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
