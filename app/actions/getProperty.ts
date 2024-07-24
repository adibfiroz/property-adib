import prismadb from "../lib/prismadb";

export interface IPropertyParams {
  propId?: string;
}

export default async function getProperty(params: IPropertyParams) {
  try {
    const { propId } = params;

    const property = await prismadb.property.findUnique({
      where: {
        id: propId,
      },
    });

    return property;
  } catch (error: any) {
    throw new Error(error);
  }
}
