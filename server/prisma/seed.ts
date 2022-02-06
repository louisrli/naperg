import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()
async function main() {
  const user = await prisma.user.create({
    data: {
      id: 5,
      firstName: 'Ivan',
      lastName: 'Ivanov',
      // fullName: 'Ivan Ivanov',
      email: faker.internet.email(),
    },
  })
  console.log({ user })

  for (let i = 1; i < 5; i += 1) {
    const feed = await prisma.feed.create({
      data: {
        id: i,
        userId: 1,
        isFavorite: faker.datatype.boolean(),
      },
    })
  }

  // for (let i = 0; i < 20; i += 1) {
  //   const feed =
  // }
}
main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
