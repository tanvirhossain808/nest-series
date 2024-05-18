import User from "@/models/userModel";
import nodemailer from "nodemailer"
import bcryptjs from "bcryptjs"
export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                }

            })

        }
        else if (emailType = "RESET") {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    forgetPasswordToken: hashedToken,
                    forgetPasswordTokenExpiry: Date.now() + 3600000
                }

            })
        }
        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "db4d2ff12c5c1c",
                pass: "5b52516922b042"
            }
        });

        const mailOptions = {
            from: 'tanvirhossan528@gmail.com',
            to: email, // list of receivers
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password", // Subject line
            text: "Hello world?", // plain text body
            html: `
            <p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}"> here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy and paste the link below in your browser
            <br>${process.env.DOMAIN}//verifyemail?token=${hashedToken}
            </p>`
        }
        const mailResponse = await transporter.sendMail(mailOptions)
        return mailResponse


    } catch (error: any) {
        console.log(error);
        throw new error
    }

}