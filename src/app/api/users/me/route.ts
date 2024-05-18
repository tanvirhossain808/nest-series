import { connect } from "@/dbConfig/db.config"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import { getDataFromToken } from "@/helpers/getDataFromToken"




connect()

export async function POST(request: NextRequest) {
    const userId = await getDataFromToken(request)
    const user = await User.findOne({ _id: userId }).select("-password")
    if (!user) {
        return NextResponse.json(
            {
                error: "Invalid token",
                success: false
            },
            {
                status: 400
            }

        )
    }
    return NextResponse.json(
        {
            message: "User found",
            data: user
        }
    )


}