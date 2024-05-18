"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
    const router = useRouter()
    const [user, setUser] = useState({
        userName: "",
        email: "",
        password: ""
    })
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)
    const onSignUp = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/signup", user)
            if (!response.data.success) {
                console.log("Not sign up please try again");
                return
            }
            console.log(response.data);
            router.push("/login")

        } catch (error: any) {
            console.log("sign up failed")
            toast.error(error.message)
        }
    }
    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.userName.length > 0) {
            setButtonDisabled(false)
        }
        else {
            setButtonDisabled(true)
        }
    }, [])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>
                {loading ? "Processing" : "Signup"}
            </h1>
            <label htmlFor="userName">Username</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                type="text" id="username" value={user.userName} name="userName" onChange={(e) => setUser({ ...user, userName: e.target.value })} placeholder="User name" />
            <label htmlFor="userName">Email</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                type="text" id="username" value={user.email} name="email" onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder="Email" />
            <label htmlFor="userName">Password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                type="password" id="username" value={user.password} name="password" onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder="password" />
            <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" onClick={onSignUp}>

                {buttonDisabled ? "No signup" : "Signup"}
            </button>
            <Link href="/login">Visit login page</Link>
        </div>
    );
};

export default page;
