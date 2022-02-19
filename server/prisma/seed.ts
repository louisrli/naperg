import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';
import * as Parser from 'rss-parser';

const prisma = new PrismaClient();

const COUNT_OF_HEADLINES = 10

async function main() {
  await prisma.headline.deleteMany();
  await prisma.post.deleteMany();
  await prisma.sourceFeedRelation.deleteMany();
  await prisma.source.deleteMany();
  await prisma.setting.deleteMany();
  await prisma.feed.deleteMany();
  await prisma.user.deleteMany();

  for (let id = 1; id <= 10; id++) {
    const user = await prisma.user.create({
      data: {
        fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    });

    await prisma.setting.create({
      data: {
        userId: user.id,
        theme: 'light'
      }
    })
  }

  const sources = [{
    title: 'JavaScript Weekly',
    url: 'https://cprss.s3.amazonaws.com/javascriptweekly.com.xml',
  }, {
    title: 'Top stories - Google News',
    url: 'https://news.google.com/rss?topic=h&hl=en-US&gl=US&ceid=US:en',
  }, {
    title: 'What is a universally beloved film that you hate?',
    url: 'https://www.reddit.com/.rss',
  }];

  let idx = 0;
  for (const source of sources) {
    const newSource = await prisma.source.create({ data: source });
    const parser = new Parser({ xml2js: true });
    const parsedResults = await parser.parseURL(newSource.url);

    // @ts-ignore
    for (const parsedResult of parsedResults.items) {
      // @ts-ignore
      const { title, link: url, content, description } = parsedResult;
      // Raw SQL stuff in future PRs we made awesome code
      // @ts-ignore

      const newPost = await prisma.post.create({
        data: {
          title,
          url,
          content: content || description,
          sourceId: newSource.id,
        },
      });

      if (idx < COUNT_OF_HEADLINES) {
        await prisma.headline.create({
          data: {
            postId: newPost.id
          }
        })
        ++idx
      }
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
