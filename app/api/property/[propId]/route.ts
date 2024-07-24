import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prismadb from "@/app/lib/prismadb";

interface IParams {
  propId?: string;
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { community, building, unitNo } = body;
    const { propId } = params;

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

    const property = await prismadb.property.update({
      where: {
        id: propId,
      },
      data: { community, building, unitNo },
    });

    return NextResponse.json(property);
  } catch (error: any) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
