import "server-only";

import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {getServerSession} from "next-auth";
import prisma from "@/lib/prisma";

export default async function currentUser() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) throw new Error("No session found");
    return await prisma.user.findUnique({
        where: {
            email: session.user.email,
        }
    });
}