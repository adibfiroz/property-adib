import prismadb from "@/app/lib/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, password, role } = body;

    // Check if the email already exists
    const existingUser = await prismadb.user.findUnique({
      where: { name },
    });

    if (existingUser) {
      return new NextResponse("Username Already registered", {
        status: 501,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Find the admin role
    const adminRole = await prismadb.role.findUnique({
      where: { name: role },
    });

    if (!adminRole) {
      return new NextResponse("Admin role not found", {
        status: 502,
      });
    }

    // Create the new admin user
    const newUser = await prismadb.user.create({
      data: {
        name,
        hashedPassword: hashedPassword,
        roleId: adminRole.id,
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    console.log("[IMAGE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
