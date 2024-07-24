"use server";

import { NextResponse } from "next/server";
import prismadb from "../lib/prismadb";
import getCurrentUser from "./getCurrentUser";

export interface IDelteParams {
  propId?: string;
}

export default async function deleteProperty(params: IDelteParams) {
  try {
    const { propId } = params;

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }

    await prismadb.property.delete({
      where: {
        id: propId,
      },
    });
  } catch (error: any) {
    throw new Error(error);
  }
}
