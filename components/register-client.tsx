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
import Link from "next/link";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import axios from "axios";
import { SafeUser } from "@/types"

interface RegisterClientProps {
    currentUser?: SafeUser | null
    roles: Role[]
}

interface Role {
    id: string;
    name: string
}


const RegisterClient = ({ currentUser, roles }: RegisterClientProps) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [selectRoles, setSelectRoles] = useState('');
    const [isLoading, setisLoading] = useState(false);
    const router = useRouter()

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setisLoading(true)
        try {
            if (!selectRoles) {
                toast.error('Select a role!');
                setisLoading(false)
                return false
            }
            await axios.post("/api/register", { name: name, password: password, role: selectRoles });
            toast.success('Admin created');
            setisLoading(false)
            router.replace("/login")
        } catch (error: any) {
            setisLoading(false)
            if (error?.response?.status === 501) {
                toast.error('Username Already registered');
            } else {
                toast.error('Something went wrong!');
            }

        }
    };

    useEffect(() => {
        if (currentUser) {
            router.replace("/")
        }
    })

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle className=" text-center">Admin Registration</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Username</Label>
                            <Input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="Your Username" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">Password</Label>
                            <Input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Your Password" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">Role</Label>
                            <select value={selectRoles} onChange={(e) => setSelectRoles(e.target.value)} name="" id="" className=" border px-2 py-3 rounded-md text-sm">
                                <option value="">Select a role</option>
                                {roles.map((item) => (
                                    <option key={item.id} value={item.name}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <CardFooter className="flex justify-between p-0 mt-5">
                        <div className=" text-sm">Already a user?
                            <Link href="/login" className=" text-blue-600 font-semibold ml-1 underline">Login</Link>
                        </div>
                        <Button type="submit" className=" w-20" disabled={isLoading}>
                            {isLoading ?
                                <img width={20} height={20} src="/btn-loading.gif" alt="" /> :
                                "Submit"
                            }
                        </Button>
                    </CardFooter>
                </form>
            </CardContent>
            <Toaster />
        </Card>
    )
}

export default RegisterClient