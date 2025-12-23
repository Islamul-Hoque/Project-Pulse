import { db } from "@/lib/db";
import { signToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password } = await req.json();
  const user = await db.collection("users").findOne({ email });

  if (!user || user.password !== password) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = signToken({ id: user._id, role: user.role });
  const res = NextResponse.json({ success: true });
  res.cookies.set("token", token, { httpOnly: true });
  return res;
}
