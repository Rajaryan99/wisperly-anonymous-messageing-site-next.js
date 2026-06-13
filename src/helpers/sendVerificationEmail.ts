import {resend} from '@/lib/resend';
import VerificationEmail from '../../.next/emails/VerificationEmail';
import {ApiResponse} from '../types/ApiResponse';


export async function verificationEmail(
    email: string,
    username: string,
    otp: string
): Promise<ApiResponse<null>>
{
    try{
          const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [email],
      subject: 'Wisperly message | Verification Code',
      react: VerificationEmail({ username, otp }),
       })

       return{
        success: true,
        message: "Verification email sent successfully"
       }

    } catch(error){
        console.error("Error sending verification email", error)
        return {
            success: false,
            message: "Failed to send verification email"
        }
    }
}