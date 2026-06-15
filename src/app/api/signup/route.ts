import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";  
import { verificationEmail } from "@/helpers/sendVerificationEmail";
import { request } from "https";
import { success } from "zod";


export async function POST(request: Request){

    try{
        const {username, email, password} = await request.json();

        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isverified: true,
        })

        if(existingUserVerifiedByUsername){
            return Response.json({
                success: false,
                message: 'Username is all ready taken'

            },{status: 400})
        }


        const existingUserVerifiedByEmail = await UserModel.findOne({
            email
        })

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        const verifyCodeExoery = new Date()
        verifyCodeExoery.setHours(verifyCodeExoery.getHours() + 1)

        if(existingUserVerifiedByEmail){
            return //todo
        } else {
            const hassedPassword = await bcrypt.hash(password, 10)

            const newUser = new UserModel({
                    username,
                    email,
                    password: hassedPassword,
                    verifyCode,
                    verifyCodeExpiry: verifyCodeExoery,
                    isVerified: false,
                    isAcceptingMessage: true,
                    messages: [],
            })

            await newUser.save();



        }

        //send verification email
        const emailResponse  =  await verificationEmail(
            email,
            username,
            verifyCode
        )


        if(!emailResponse.success){
            return Response.json({
                success:  false,
                message: emailResponse.message
            }, {status: 500})
        }

        return Response.json({
                success:  true,
                message: "User Register successfully, Please verigy you email"
            }, {status: 200})


      


            

    } catch (error) {
        console.error("Error during signup", error);
        return new Response(
            JSON.stringify({
                success: false,
                message: "Internal server error",
            }),
            { status: 500 }
        );
    }
}         
        
    
