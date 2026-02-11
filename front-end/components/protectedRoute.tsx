"use client";
import  { redirect}  from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
    children
}:{children: React.ReactNode}) {

useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
        return redirect("/login");
    }
}, []);
return <>{children}</>;
}