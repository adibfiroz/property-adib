import prismadb from "../lib/prismadb";

export default async function getProperties() {
  try {
    const property = await prismadb.property.findMany({
      orderBy: {
        id: "desc",
      },
    });

    return property;
  } catch (error: any) {
    throw new Error(error);
  }
}
