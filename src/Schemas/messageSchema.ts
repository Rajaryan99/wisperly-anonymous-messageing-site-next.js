import { Content } from "next/font/google";
import { z } from "zod";

export const messageSchema = z.object({
    content: z
        .string()
        .min(10, {message: 'content must be of atleast 10 character'})
        .max(300, {message: 'content must be not more then 300 character'})

})