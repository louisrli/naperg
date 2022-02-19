import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  await prisma.post.deleteMany();
  await prisma.sourceFeedRelation.deleteMany();
  await prisma.source.deleteMany();
  await prisma.setting.deleteMany();
  await prisma.feed.deleteMany();
  await prisma.user.deleteMany();

  for (let id = 1; id <= 10; id++) {
    const user = await prisma.user.create({
      data: {
        id,
        fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    });

    await prisma.setting.create({
      data: {
        id,
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

  for (const source of sources) {
    await prisma.source.create({ data: source });
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
