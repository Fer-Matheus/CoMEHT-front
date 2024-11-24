"use client"
import NavBar from "@/components/navbar";
import { Base } from "@/components/page/base";
import { deleteCookie } from "cookies-next";
import { LogOut } from "lucide-react";

export default function Finished() {
    return (
        <Base>
            <NavBar link="https://github.com/Fer-Matheus" />
            <div className="w-screen h-screen flex flex-col justify-center items-center text-textColor">
                <div className="w-[30rem] h-[25rem] bg-itemsBackgroud border border-borderItems rounded-lg">
                    <h1 className="text-[3rem] flex justify-center items-center">Thank You</h1>

                    <p className="w-full mt-10 flex flex-col justify-center items-center text-xl text-center">We are very happy with your contribution. Now let's evaluate the data collected and move forward with our research.
                    </p>
                    <a href="/" onClick={() => deleteCookie("Authorization")} className="flex flex-col justify-center items-center text-lg mt-5">
                        <LogOut size={50} />
                        <p>Logout</p>
                    </a>
                </div>
            </div>
        </Base>
    );
}