import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

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

  const programs = await prisma.program.findMany();

  return <DashboardClient user={user} programs={programs} />;
}