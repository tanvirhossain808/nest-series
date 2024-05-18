"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const LoginPage = () => {
    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    console.log(user);
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)
    const onLogin = async () => {
        try {
            setLoading(true)
            console.log(user);
            const response = await axios.post("/api/users/login", user)
            // if (!response.data.success) {
            //     console.log("Not sign up please try again");
            //     return
            // }
            console.log(response.data);
            router.push("/profile")

        } catch (error: any) {
            console.log(error.message)
            toast.error(error)
        }
    }
    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        }
        else {
            setButtonDisabled(true)
        }
    }, [user])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>
                {loading ? "Processing" : "Login"}
            </h1>
            <label htmlFor="userName">Email</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                type="text" id="username" value={user.email} name="email" onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder="Email" />
            <label htmlFor="userName">Password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                type="password" id="username" value={user.password} name="password" onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder="password" />
            <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" onClick={onLogin}>

                {buttonDisabled ? "No Login" : "Login"}
            </button>
            <Link href="/signup">Visit sing up page</Link>
        </div>
    );
};

export default LoginPage;
