import connection from "@/db/connection";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import customerModel from "@/db/models/customer.model";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    await connection();
    const session: any = await getServerSession(authOptions);

    // await customerModel.create({
    //   name: form.get("name"),
    //   address: form.get("address"),
    //   mobile: form.get("mobile"),
    //   terms: form.get("terms"),
    //   creditLimit: form.get("creditLimit"),
    //   default: form.get("default") || false,
    //   addedBy: session?.user._id,
    // });

    return NextResponse.json({}, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
