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

interface EditPropertyClientProps {
    property: Property | null
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

const EditPropertyClient = ({ property, currentUser }: EditPropertyClientProps) => {
    const [community, setCommunity] = useState(property?.community || "");
    const [building, setBuilding] = useState(property?.building || "");
    const [unitNo, setUnitNo] = useState('');
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
            await axios.put(`/api/property/${property?.id}`, {
                community: community,
                building: building,
                unitNo: unitNo,
            });
            toast.success('property updated');
            setisLoading(false)
            router.replace("/")
            router.refresh()
        } catch (error: any) {
            setisLoading(false)
            if (error?.response?.status === 501) {
                toast.error('Property Already exist!');
            } else {
                toast.error('Something went wrong!');
            }
        }
    };

    useEffect(() => {
        setUnitNo(property?.unitNo || "")
    }, [property?.unitNo]);


    useEffect(() => {
        if (currentUser?.role !== "Admin") {
            router.replace("/")
        }
    })


    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle className=" text-center">Edit Property</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Community</Label>
                            <select required defaultValue={community} onChange={(e) => setCommunity(e.target.value)} name="" id="" className=" border px-2 py-3 rounded-md text-sm">
                                <option value="">Select community</option>
                                <option value="CommunityA">CommunityA</option>
                                <option value="CommunityB">CommunityB</option>
                            </select>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">Building</Label>
                            <select required defaultValue={building} onChange={(e) => setBuilding(e.target.value)} name="" id="" className=" border px-2 py-3 rounded-md text-sm">
                                <option value="">Select Building</option>
                                <option value="BuildingA">BuildingA</option>
                                <option value="BuildingB">BuildingB</option>
                            </select>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">unitNo</Label>
                            <Input
                                type="text"
                                id="unitNo"
                                defaultValue={property?.unitNo}
                                onChange={(e) => setUnitNo(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <CardFooter className="flex justify-center p-0 mt-5">
                        <Button type="submit" className=" w-20" disabled={isLoading}>
                            {isLoading ?
                                <img width={20} height={20} src="/btn-loading.gif" alt="" /> :
                                "Update"
                            }
                        </Button>
                    </CardFooter>
                </form>
            </CardContent>
            <Toaster />
        </Card>
    )
}

export default EditPropertyClient