import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prismadb from "@/app/lib/prismadb";

interface IParams {
  customerId?: string;
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { name, propertyId } = body;
    const { customerId } = params;

    if (!currentUser) {
      return NextResponse.error();
    }

    const property = await prismadb.lead.update({
      where: {
        id: customerId,
      },
      data: { name, propertyId },
    });

    return NextResponse.json(property);
  } catch (error: any) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
