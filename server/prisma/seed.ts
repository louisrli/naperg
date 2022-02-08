import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()
async function main() {
  const user = await prisma.user.create({
    data: {
      email: `admin@naperg.com`,
      name: 'Admin Naperg',
      password: await bcrypt.hash('admin', 10),
      role: 'ADMIN',
      resetPasswordToken: '123',
      validateEmailToken: '',
      isEmailValidated: true
    },
  })
	for (let i  = 0; i < 10; i++) {
		await prisma.source.create({
			data: {
				slug: `asldaklda${i}`,
				title: `asdnmsd${i}`,
			}
		})
	}
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
