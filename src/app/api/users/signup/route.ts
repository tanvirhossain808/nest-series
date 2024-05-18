import { connect } from "@/dbConfig/db.config"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/helpers/maller"


connect()



export async function POST(request: NextRequest) {
    console.log("object");
    try {
        const reqBody = await request.json()
        const { userName, email, password }: any = reqBody
        console.log(userName);
        const user = await User.findOne({ email })
        if (user) {
            return NextResponse.json(
                {
                    error: "User already exists"
                },
                {
                    status: 400
                }
            )
        }

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password, salt)
        const newUser = new User({
            userName,
            email,
            password: hashPassword
        })
        const savedUser = await newUser.save()

        console.log(savedUser)
        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id })
        return NextResponse.json({
            success: true
        })

    } catch (error: any) {
        console.log("object");
        return NextResponse.json({ error: error.message }, { status: 500 })
    }


}