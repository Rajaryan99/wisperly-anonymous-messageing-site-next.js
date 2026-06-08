import mongoose, {Schema, Document} from "mongoose";
import { unique } from "next/dist/build/utils";

export interface Message extends Document{
    content: string;
    createdAt: Date
}



const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },

    
})


export interface User extends Document{
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    messages: Message[];

}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
        unique: true,
        trim: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
         match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"]

    },
    password: {
        type: String,
        required: true,
    },
    verifyCode: {
        type: String,
        required: true,
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "Verify code Expiry is required"]

    },
    isVerified:{
        type: Boolean,
        default: false,
    },

    isAcceptingMessage:{
        type: Boolean,
        default: true,
    },
    messages: [MessageSchema]


})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

export default UserModel;
