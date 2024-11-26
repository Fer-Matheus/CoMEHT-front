"use client"
import NavBar from "@/components/navbar";
import { Base } from "@/components/page/base";
import { deleteCookie } from "cookies-next";
import { LogOut } from "lucide-react";

export default function Finished() {
    return (
        <Base>
            <NavBar/>
            <div className="w-screen h-screen flex flex-col justify-center items-center text-textColor">
                <div className="w-[30rem] h-[25rem] bg-itemsBackgroud border border-borderItems rounded-lg">
                    <h1 className="mt-[3rem] text-[3rem] flex justify-center items-center">Thank You</h1>

                    <p className="w-full mt-5 flex flex-col justify-center items-center text-xl text-center">We are very happy with your contribution. Now let's evaluate the data collected and move forward with our research.
                    </p>
                    <a href="/" onClick={() => deleteCookie("Authorization")} className="flex flex-col justify-center items-center text-lg mt-[2.5rem]">
                        <LogOut size={50} />
                        <p>Logout</p>
                    </a>
                </div>
            </div>
        </Base>
    );
}