"use server";

import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function startProgram(programId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.name) return;

  const user = await prisma.user.findUnique({ where: { username: session.user.name } });
  if (!user) return;

  await prisma.userProgress.create({
    data: {
      userId: user.id,
      programId,
      day: 1,
      completed: false
    }
  });

  revalidatePath("/dashboard");
}

export async function checkIn(progressId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.name) return { error: "Not logged in" };

  const progress = await prisma.userProgress.findUnique({ 
    where: { id: progressId }, 
    include: { program: true, user: true } 
  });
  
  if (!progress) return { error: "Not found" };

  const now = new Date();
  const diffInSeconds = (now.getTime() - progress.updatedAt.getTime()) / 1000;
  
  // 15-second time gate for MVP
  if (diffInSeconds < 15) {
    return { error: `WAIT ${Math.ceil(15 - diffInSeconds)} MORE SECONDS TO CHECK IN AGAIN.` };
  }

  const isFinished = progress.day >= progress.program.duration;

  if (isFinished) {
    await prisma.userProgress.update({
      where: { id: progressId },
      data: { completed: true, updatedAt: new Date() }
    });
    await prisma.user.update({
      where: { id: progress.user.id },
      data: { points: progress.user.points + 50 }
    });
  } else {
    await prisma.userProgress.update({
      where: { id: progressId },
      data: { day: progress.day + 1, updatedAt: new Date() }
    });
    await prisma.user.update({
      where: { id: progress.user.id },
      data: { streak: progress.user.streak + 1, points: progress.user.points + 10 }
    });
  }

  revalidatePath("/dashboard");
  return { success: true };
}
