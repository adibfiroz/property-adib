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
import { signIn } from 'next-auth/react';
import { SafeUser } from "@/types"

interface LoginClientProps {
    currentUser?: SafeUser | null
}

const LoginClient = ({ currentUser }: LoginClientProps) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        signIn('credentials', {
            password,
            name,
            redirect: false,
        })
            .then((callback) => {
                setIsLoading(false)

                if (callback?.ok) {
                    toast.success('Logged in');
                    window.location.href = "/"
                }

                if (callback?.error) {
                    toast.error(callback.error);
                }
            })
    }


    useEffect(() => {
        if (currentUser) {
            router.replace("/")
        }
    })


    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle className=" text-center">Admin Login</CardTitle>
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
                    </div>
                    <CardFooter className="flex justify-between p-0 mt-5">
                        <div className=" text-sm">New to Property?
                            <Link href="/register" className=" text-blue-600 font-semibold ml-1 underline">Create</Link>
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

export default LoginClient