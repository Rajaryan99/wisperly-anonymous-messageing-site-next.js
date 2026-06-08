import { z } from "zod";

export const usernameValidation = z
    .string()
    .min(2, "Username must contain at least 2 character!")
    .max(20, "User must be not more then 20 chracter")
    .regex(/^[a-zA-Z0-9_]{3,20}$/, "Username must not contain special charcater")



export const singUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(6, {message: "password must be at least 6 character"})
})
    
