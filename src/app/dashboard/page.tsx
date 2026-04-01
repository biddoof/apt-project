import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";
import { authOptions } from "../api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.name) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { username: session.user.name },
    include: {
      progress: {
        where: { completed: false },
        include: { program: true },
        take: 1
      }
    }
  });

  if (!user) { redirect("/api/auth/signout"); }

  const programs = await prisma.program.findMany();

  let todayWorkout = null;
  if (user?.progress?.[0]) {
    const active = user.progress[0];
    todayWorkout = await prisma.dailyWorkout.findFirst({
      where: {
        programId: active.programId,
        dayNumber: active.day
      }
    });
  }

  return <DashboardClient user={user} programs={programs} todayWorkout={todayWorkout} />;
}
