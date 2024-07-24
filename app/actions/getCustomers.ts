import prismadb from "../lib/prismadb";

export default async function getCustomers() {
  try {
    const lead = await prismadb.lead.findMany({
      orderBy: {
        id: "desc",
      },
      include: {
        property: true,
      },
    });

    return lead;
  } catch (error: any) {
    throw new Error(error);
  }
}
