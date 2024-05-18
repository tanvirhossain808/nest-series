import { connect } from "@/dbConfig/db.config"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"




connect()


export async function POST(request: NextRequest) {


    try {
        const reqBody = await request.json()
        const { email, password } = reqBody
        const user = await User.findOne(email)

        if (!user) {
            return NextResponse.json(
                {
                    error: "User does not exits"
                },
                {
                    status: 400
                }

            )
        }
        console.log("User Exits");
        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword) {
            return NextResponse.json(
                {
                    error: "Check your credential"
                },
                {
                    status: 400
                }
            )
        }

        const tokenData =
        {
            id: user._id,
            userName: user.userName,
            email: user.email
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "id" })

        const response = NextResponse.json(
            {
                message: "Login Success",
                success: true
            }
        )
        response.cookies.set("token", token,
            {
                httpOnly: true
            }
        )
        return response
    } catch (error: any) {
        return NextResponse.json(
            {
                error: error.message
            },
            {
                status: 500
            }
        )
    }

}