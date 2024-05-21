"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";


const ProfilePage = () => {
    const router = useRouter()
    const [data, setData] = useState("nothing")
    const getUserDetails = async () => {

        try {

            const response = await axios.post("/api/users/me")
            console.log(response);
            setData(response.data.data._id)

        }
        catch (error: any) {
            console.log(error)
            toast.error(error.message)
        }

    }


    const logout = async () => {
        try {
            const response = await axios.get("api/users/logout")
            toast.success("Logout successfully")
            router.push("/login")

        } catch (error: any) {
            console.log(error);
            toast.error(error.message)

        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>This is for login</h1>
            <hr />
            <h2>{data === "nothing" ? "nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr />
            <button
                className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={logout}>Logout</button>
            <button
                className="bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={getUserDetails}>Get user details</button>
        </div>
    );
};

export default ProfilePage;
