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

interface CreatePropertyClientProps {
    currentUser?: SafeUser | null
}

const CreatePropertyClient = ({ currentUser }: CreatePropertyClientProps) => {
    const [community, setCommunity] = useState('');
    const [building, setBuilding] = useState('');
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
            await axios.post("/api/property/create", {
                community: community,
                building: building,
                unitNo: unitNo,
            });
            setisLoading(false)
            router.replace("/")
            router.refresh()
            toast.success('property created');
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
        if (currentUser?.role !== "Admin") {
            router.replace("/")
        }
    })


    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle className=" text-center">Create a Property</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Community</Label>
                            <Input
                                type="text"
                                id="community"
                                value={community}
                                onChange={(e) => setCommunity(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">Building</Label>
                            <Input
                                type="text"
                                id="building"
                                value={building}
                                onChange={(e) => setBuilding(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">unitNo</Label>
                            <Input
                                type="text"
                                id="unitNo"
                                value={unitNo}
                                onChange={(e) => setUnitNo(e.target.value)}
                                required
                            />
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

export default CreatePropertyClient