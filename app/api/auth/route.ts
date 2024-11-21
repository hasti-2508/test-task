import { NextResponse } from "next/server";
import { signUpWithEmailPassword, signInWithEmailPassword, logout } from "../../../firebase/auth";

export async function POST(req: Request) {
  const { email, password, action } = await req.json();

  try {
    if (action === "signup") {
      const user = await signUpWithEmailPassword(email, password);
      return NextResponse.json({ message: "User created", user });
    }
    
    if (action === "signin") {
      const user = await signInWithEmailPassword(email, password);
      return NextResponse.json({ message: "User signed in", user });
    }

    return NextResponse.error();
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

export async function DELETE(req: Request) {
  try {
    await logout();
    return NextResponse.json({ message: "User logged out" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
