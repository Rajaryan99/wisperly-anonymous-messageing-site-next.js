import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";


export const authOptions: NextAuthOptions = {
    providers: [
        
        CredentialsProvider({
            id:  "credentials",
            name: "Credentials",
            credentials: {
                identifier: { label: "email or Username", type: "text" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials: any): Promise<any>{

                await dbConnect();

                try {

                 const user =    await UserModel.findOne({
                        $or: [
                            {email: credentials.identifier},
                            {username: credentials.identifier}
                        ]
                    })

                        if(!user){
                            throw new Error("No user found with this credientials")
                        }

                        if(!user.isVerified){
                            throw new Error("The user is not verified")
                        }

                        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

                        if(isPasswordCorrect){
                            return user
                        } else {
                            throw new Error("Incorrect password")
                        }
                    
                } catch (error: any) {
                    throw new Error(error)
                }
            }
        })
    ],

    callbacks:{
         async session({ session, token }) 
        {

            if (session.user && token) {
                session.user._id = token._id as string
                session.user.isVerified = token.isVerified as boolean
                session.user.isAcceptingMessages = token.isAcceptingMessages as boolean
                session.user.username = token.username as string
            }
    
            return session
        },
        async jwt({ token, user }) 
        {

            if(user){
                token._id = user._id?.toString()
                token.isVerified = user.isVerified    
                token.isAcceptingMessages = user.isAcceptingMessages      
                token.username = user.username
             }
            return token
        }
    },

    pages: {
        signIn: '/signin'
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
}