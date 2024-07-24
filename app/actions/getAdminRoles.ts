import prismadb from "../lib/prismadb";

export default async function getAdminRoles() {
  try {
    const role = await prismadb.role.findMany();

    return role;
  } catch (error: any) {
    throw new Error(error);
  }
}
