"use server";
import { prisma } from "@/server/db";
import { type AuthUser } from "@/types";


export async function createUser({
  username,
  email,
  id
}: AuthUser) {

  const user = await getUser(id);

  if (!user){
    await prisma.user.create({
      data: {
        id: id,
        email: email,
        name: username,
      },
    });
  }
}

export async function getUser(
  id: string
){
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return user;
}