import { NextResponse, NextRequest } from "next/server";

import { getUserInfoById } from "@/app/lib/UserData/UserDB";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getUserInfoById(id);

    if (!Array.isArray(user) || user.length === 0) {
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }

    return NextResponse.json({ data: user }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
