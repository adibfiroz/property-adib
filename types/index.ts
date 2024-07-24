import { User } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "hashedPassword"
> & {
  createdAt: string;
  updatedAt: string;
  role: string | any;
};
