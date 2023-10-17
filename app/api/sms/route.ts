import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(req: NextRequest) {
//   const sms = twilio(
//     process.env.TWILIO_ACCOUNT_SID,
//     process.env.TWILIO_AUTH_TOKEN
//   );

//   await sms.messages.create({
//     to: "+639978276641",
//     body: "SMS TEST",
//     from: process.env.TWILIO_PHONE_NUMBER,
//   });

  return NextResponse.json({ msg: "success" });
}
