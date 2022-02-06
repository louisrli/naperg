import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()
async function main() {
  await prisma.post.deleteMany()
  await prisma.sourceFeedRelation.deleteMany()
  await prisma.source.deleteMany()
  await prisma.feed.deleteMany()
  await prisma.user.deleteMany()

  const user = await prisma.user.create({
    data: {
      id: 5,
      fullName: 'Ivan Ivanov',
      email: faker.internet.email(),
    },
  })
  console.log({ user })

  // создаю фиды
  for (let i = 1; i < 5; i += 1) {
    const feed = await prisma.feed.create({
      data: {
        id: i,
        userId: 5,
        isFavorite: faker.datatype.boolean(),
      },
    })
  }

  // создаю сорцы
  for (let i = 1; i < 4; i += 1) {
    const domainName = faker.internet.domainName()
    const source = await prisma.source.create({
      data: {
        id: i,
        title: domainName,
        url: `http://${domainName}`,
      },
    })
  }

  // sourceFeedRelation

  // у первого фида все 3 сорца
  for (let i = 1; i < 4; i += 1) {
    await prisma.sourceFeedRelation.create({
      data: {
        sourceId: i,
        feedId: 1,
      },
    })
  }

  // у второго фида только второй сорц (1 шт)
  await prisma.sourceFeedRelation.create({
    data: {
      sourceId: 2,
      feedId: 2,
    },
  })

  // у третьего фида НЕТУ сорцов

  //   /sourceFeedRelation

  // posts

  for (let i = 1; i < 4; i += 1) {
    for (let x = 1; x < 11; x += 1) {
      await prisma.post.create({
        data: {
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraphs(4),
          imgUrl: faker.image.imageUrl(),
          url: faker.internet.url(),
          sourceId: i,
        },
      })
    }
  }

  // /posts
}
main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
