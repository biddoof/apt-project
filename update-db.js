const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const programs = await prisma.program.findMany({ orderBy: { id: 'asc' } });
  if (programs.length >= 3) {
    await prisma.program.update({
      where: { id: programs[0].id },
      data: { name: 'Cardio & Evasion', description: 'Lots of running, jumping, and vaulting over debris. Good for getting out of bad situations fast.' }
    });
    await prisma.program.update({
      where: { id: programs[1].id },
      data: { name: 'Health & Recovery', description: 'Stretching, mobility, and making the most of limited rations and water. Crucial for long-term survival.' }
    });
    await prisma.program.update({
      where: { id: programs[2].id },
      data: { name: 'Strength & Scavenging', description: 'Heavy lifting using cinder blocks, water jugs, and scrap metal. Build the strength needed to clear rubble.' }
    });
  }
}
main().finally(() => prisma.$disconnect());
