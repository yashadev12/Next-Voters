import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url)
    const to = searchParams.get("to")

    if (!to) {
      return NextResponse.json(
        { success: false, error: "Missing `to` query parameter" },
        { status: 400 }
      )
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Next App" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Confirmation Email",
      text: "Thank you for signing up to Next Voters Line!",
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    )
  }
}
