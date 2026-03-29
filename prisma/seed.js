const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('password', 10);
  
  await prisma.user.upsert({
    where: { username: 'survivor' },
    update: {},
    create: {
      username: 'survivor',
      password,
    },
  });

  const programs = [
    { name: 'Fitness & Endurance', description: 'Outrun the machines. Build stamina for long-distance evasion.' },
    { name: 'Health & Wellness', description: 'Ration management, injury recovery, and psychological fortitude.' },
    { name: 'Survival & Combat', description: 'Scavenging techniques, melee defense, and perimeter security.' },
  ];

  for (const p of programs) {
    const exists = await prisma.program.findFirst({ where: { name: p.name }});
    if (!exists) {
      await prisma.program.create({ data: { name: p.name, description: p.description, duration: 14 }});
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
