"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SafeUser } from "@/types"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"

interface CreateCustomerClientProps {
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


const CreateCustomerClient = ({ property, currentUser }: CreateCustomerClientProps) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [selectedProperty, setSelectedProperty] = useState('');
    const [isLoading, setisLoading] = useState(false);
    const router = useRouter()


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setisLoading(true)
        try {
            if (currentUser?.role !== "Admin") {
                toast.error('Not Authorised!');
                return false
            }
            if (!selectedProperty) {
                toast.error('Select a Property!');
                setisLoading(false)
                return false
            }
            await axios.post("/api/customer/create", {
                name: name,
                email: email,
                propertyId: selectedProperty ? selectedProperty : null
            });
            setisLoading(false)
            router.replace("/")
            router.refresh()
            toast.success('customer created');
        } catch (error: any) {
            setisLoading(false)
            if (error?.response?.status === 501) {
                toast.error('Customer Already exist!');
            } else {
                toast.error('Something went wrong!');
            }
        }
    };

    useEffect(() => {
        if (currentUser?.role !== "Admin") {
            router.replace("/")
        }
    })


    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle className=" text-center">Create a customer</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">name</Label>
                            <Input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">email</Label>
                            <Input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">Property</Label>
                            <select value={selectedProperty} onChange={(e) => setSelectedProperty(e.target.value)} name="" id="" className=" border px-2 py-3 rounded-md text-sm">
                                <option value="">Select a property</option>
                                {property.map((item) => (
                                    <option key={item.id} value={item.id}>{item.community}, {item.building}, {item.unitNo}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <CardFooter className="flex justify-center p-0 mt-5">
                        <Button type="submit" className=" w-20" disabled={isLoading}>
                            {isLoading ?
                                <img width={20} height={20} src="/btn-loading.gif" alt="" /> :
                                "Create"
                            }
                        </Button>
                    </CardFooter>
                </form>
            </CardContent>
            <Toaster />
        </Card>
    )
}

export default CreateCustomerClient