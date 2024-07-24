import getCurrentUser from "@/app/actions/getCurrentUser";
import prismadb from "@/app/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  const body = await request.json();
  const { name, email, propertyId } = body;

  if (!currentUser) {
    return NextResponse.error();
  }

  const existingUser = await prismadb.lead.findUnique({
    where: { email },
  });

  if (existingUser) {
    return new NextResponse("customer Already exist", {
      status: 501,
    });
  }

  const customer = await prismadb.lead.create({
    data: { name, email, propertyId: propertyId },
  });

  return NextResponse.json(customer);
}
