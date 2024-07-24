"use client"

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
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import deleteProperty from "@/app/actions/delete-property";
import { SafeUser } from "@/types";


interface PropertyTableProps {
    property: Property[]
    currentUser?: SafeUser | null
}

interface Property {
    id: string;
    community: Community;
    building: Building;
    unitNo: string;
}

type Community = 'CommunityA' | 'CommunityB';
type Building = 'BuildingA' | 'BuildingB';

const PropertyTable = ({ property, currentUser }: PropertyTableProps) => {
    const router = useRouter()

    const handleDelete = async (id: string) => {
        try {
            await deleteProperty({ propId: id });
            router.refresh()
            toast.success('property deleted');
        } catch (error: any) {
            toast.error('Something went wrong!');
        }
    };

    const handleAdmin = () => {
        if (!currentUser) {
            router.replace("/login")
        }
        if (currentUser) {
            if (currentUser?.role !== "Admin") {
                toast.error('Not Authorised!');
                return false
            } else {
                router.replace("/property/create")
            }
        }
    }

    const handleAdminEdit = (id: string) => {
        if (!currentUser) {
            router.replace("/login")
        }
        if (currentUser) {
            if (currentUser?.role !== "Admin") {
                toast.error('Not Authorised!');
                return false
            } else {
                router.replace(`/property/edit/${id}`)
            }
        }
    }

    return (
        <div>
            <div className='flex justify-between items-center'>
                <h2 className=' text-2xl font-semibold'>Properties</h2>
                <Button onClick={handleAdmin} variant="link" className=' text-blue-600 text-md font-semibold'>Create Property</Button>
            </div>

            <div className='mt-5 border rounded-md overflow-auto'>
                <table width="100%">
                    <tbody>
                        <tr>
                            <th className='p-4 text-left'>Commuinty</th>
                            <th className='p-4 text-left'>Building</th>
                            <th className='p-4 text-left '>unitNo</th>
                            <th className='p-4 text-left'>Action</th>
                        </tr>
                        {property.map((item) => (
                            <tr key={item.id}>
                                <td className='p-4'>{item.community}</td>
                                <td className='p-4'>{item.building}</td>
                                <td className='p-4'>{item.unitNo}</td>
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
                                            <DropdownMenuItem onClick={() => handleAdminEdit(item.id)} className="  cursor-pointer " >
                                                <Edit className="mr-2 h-4 w-4" />
                                                Edit
                                            </DropdownMenuItem>
                                            {currentUser?.role === "Admin" &&
                                                <DropdownMenuItem onClick={() => handleDelete(item.id)} className=" text-[#ff4d88] cursor-pointer ">
                                                    <Trash className="mr-2 h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            }
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Toaster />
            </div>
        </div>
    )
}

export default PropertyTable