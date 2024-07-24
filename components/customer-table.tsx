"use client"

import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit, MoreHorizontal, Trash } from "lucide-react"
import { Button } from "./ui/button";
import Link from "next/link";
import { SafeUser } from "@/types";
import { useEffect } from "react";

interface CustomerTableProps {
    customer: Customer[]
    currentUser?: SafeUser | null
}

interface Customer {
    id: string;
    name: string;
    email: string;
    property?: Property | null
}

interface Property {
    community: string;
    building: string;
    unitNo: string;
}

const CustomerTable = ({ customer, currentUser }: CustomerTableProps) => {
    const router = useRouter()


    return (
        <div className='mt-5 border rounded-md overflow-auto'>
            <table width="100%">
                <tbody>
                    <tr>
                        <th className='p-4 text-left'>name</th>
                        <th className='p-4 text-left'>Email</th>
                        <th className='p-4 text-left '>Property</th>
                        <th className='p-4 text-left '>Actions</th>
                    </tr>
                    {customer.map((item) => (
                        <tr key={item.id}>
                            <td className='p-4'>{item.name}</td>
                            <td className='p-4'>{item.email}</td>

                            {item?.property?.community ?
                                <td className='p-4'>{item?.property?.community}, {item?.property?.building}, {item?.property?.unitNo}</td>
                                :
                                <td></td>
                            }

                            <td>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className=" sr-only">Open Menu</span>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <Link href={`/customer/edit/${item.id}`}>
                                            <DropdownMenuItem className="  cursor-pointer " >
                                                <Edit className="mr-2 h-4 w-4" />
                                                Edit
                                            </DropdownMenuItem>
                                        </Link>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CustomerTable