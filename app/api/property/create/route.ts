import getCurrentUser from "@/app/actions/getCurrentUser";
import prismadb from "@/app/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  const body = await request.json();
  const { community, building, unitNo } = body;

  if (!currentUser) {
    return NextResponse.error();
  }

  const existingProperty = await prismadb.property.findFirst({
    where: { community, building, unitNo },
  });

  if (existingProperty) {
    return new NextResponse("property Already exist", {
      status: 501,
    });
  }

  const property = await prismadb.property.create({
    data: { community, building, unitNo },
  });

  return NextResponse.json(property);
}
