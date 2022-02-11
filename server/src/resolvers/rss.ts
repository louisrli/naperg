/**
 * Contains resolvers related to refreshing RSS feeds.
 *
 * This would be an example of separating resolvers more cleanly into separate
 * files. Note that there are many ways to do this, depending on how large your
 * app is.
 */
import { Context } from "../model/appInterface";

// This is the number, in minutes, before a source is considered "stale" and
// needs to be refreshed. That is, if a source has not been refreshed in the last
// N minutes, it should be refreshed.
//
// You may change this value if you want for testing. You can even change it to
// seconds.
//
// Please note the avoidance of magic numbers.
// https://en.wikipedia.org/wiki/Magic_number_(programming)
const SOURCE_STALENESS_MINUTES = 10;

export const rssMutationResolvers = {
  refreshFeeds: async (parent, args, ctx: Context) => {
    // TODO: Using Prisma, query for all sources. Filter only for stale sources,
    // either using Prisma filters or using code.
    const staleSources = [];

    for (let i = 0; i < staleSources.length; i++) {
      // TODO: For each stale source, use an RSS parser of your choice to parse the RSS feed.
      // https://www.google.com/search?q=rss+feed+parser+node
      // You may need to change this code depending on your approach for
      // handling asynchronicity.
      const parsedResult = parseRssFeed(staleSources[i].rssFeedUrl);


    }
  },
};

const parseRssFeed
