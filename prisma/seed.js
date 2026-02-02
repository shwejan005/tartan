import prisma from '../lib/db.js'

async function main() {
  console.log('Seeding database...')

  // Create a demo user
  const user = await prisma.user.upsert({
    where: { email: 'demo@tartan.dev' },
    update: {},
    create: {
      email: 'demo@tartan.dev',
      name: 'Demo User',
      password: '$2a$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/opStY0xL7./Km', // password: "demo123"
    },
  })

  console.log('Created user:', user.email)

  // Create a demo project with a design
  const project = await prisma.project.upsert({
    where: { id: 'demo' },
    update: {},
    create: {
      id: 'demo',
      name: 'Demo Project',
      userId: user.id,
      design: {
        create: {
          config: {
            theme: {
              primaryColor: '#000000',
              borderRadius: '0.5rem',
            },
            blocks: [
              { id: '1', type: 'header', content: 'Welcome Back' },
              { id: '2', type: 'email', label: 'Email Address', placeholder: 'you@example.com' },
              { id: '3', type: 'password', label: 'Password', placeholder: '••••••••' },
              { id: '4', type: 'button', label: 'Sign In' },
            ],
          },
        },
      },
    },
  })

  console.log('Created project:', project.id)
  console.log('Done!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
