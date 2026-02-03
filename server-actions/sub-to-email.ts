"use server"

import { db } from "@/lib/db"

export const handleSubscribeEmail = async (email: string, topics: string[]) => {

    const isEmailSubbed = await db
        .selectFrom("email_subscriptions")
        .select("email")
        .where("email", "=", email)
        .executeTakeFirst()

    if (!isEmailSubbed) {
        await db
            .insertInto("email_subscriptions")
            .values({ email, topics })
            .execute()
    } else {
        return { error: "Email already subscribed" }
    }
}