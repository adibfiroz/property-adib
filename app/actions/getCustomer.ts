import prismadb from "../lib/prismadb";

export interface ICustomerParams {
  customerId?: string;
}

export default async function getCustomer(params: ICustomerParams) {
  try {
    const { customerId } = params;

    const customer = await prismadb.lead.findUnique({
      where: {
        id: customerId,
      },
    });

    return customer;
  } catch (error: any) {
    throw new Error(error);
  }
}
