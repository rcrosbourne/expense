"use server";

import {Wallet} from "@/app/types";
import prisma from "@/lib/prisma";
import {getServerSession, User} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export async function AddWalletAction(data: Wallet) {
    // use prisma to save data to database]
    console.log({data});
    // get user from database
    const user = await prisma.user.findUnique({
        where: {
            email: data.user.email
        }
    });
    const wallet = await prisma.wallet.create({
        data: {
            name: data.name,
            category: data.category,
            budget: data.budget,
            user: {
                connect: {
                    id: user.id
                }
            }
        }
    });
    console.log({wallet});
    return wallet;
}