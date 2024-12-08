"use client"
import NavBar from "@/components/navbar";
import { Base } from "@/components/page/base";
import { api } from "@/services/api";
import { LoginUser, Register } from "@/services/authentification";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {

    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const toggleForm = () => setIsLogin(!isLogin);

    const router = useRouter();

    const handlerLoginClick = async (e: React.FormEvent) => {
        e.preventDefault();

        if (username.length < 8) {
            alert("The username must have a minimum of 8 characters");
            return
        }

        if (password.length < 8) {
            alert("The password must have a minimum of 8 characters");
            return
        }

        const authorization = await LoginUser({ username, password })
        if (authorization) {
            api.defaults.headers.common["Authorization"] = `Bearer ${authorization}`
        }

        setCookie("Authorization", authorization)

        router.push("/arena")
    }
    const handlerRegisterClick = async (e: React.FormEvent) => {
        e.preventDefault();

        if (username.length < 8) {
            alert("The username must have a minimum of 8 characters");
            return
        }

        if (password.length < 8) {
            alert("The password must have a minimum of 8 characters");
            return
        }

        const authorization = await Register({ username, password })
        if (authorization) {
            api.defaults.headers.common["Authorization"] = `Bearer ${authorization}`
        }

        setCookie("Authorization", authorization)

        router.push("/arena")
    }

    return (
        <Base>
            <NavBar />
            <div className="w-screen h-screen flex flex-col justify-center items-center">
                <div className="w-[30rem] h-[27rem] bg-itemsBackgroud border border-borderItems rounded-lg p-6">
                    <h2 className="text-3xl font-bold mb-6 text-center">
                        {isLogin ? "Login" : "Register"}
                    </h2>

                    {isLogin ? (
                        <form className="flex flex-col justify-center items-center" onSubmit={handlerLoginClick}>
                            <div className="mb-4">
                                <label
                                    htmlFor="username"
                                    className="block text-white font-medium mb-2"
                                >
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    className="w-[20rem] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                                    placeholder="your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="password"
                                    className="block text-white font-medium mb-2"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className="w-[20rem] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                                    placeholder="your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-[20rem] bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                            >
                                Login
                            </button>
                        </form>
                    ) : (
                        <form className="flex flex-col justify-center items-center" onSubmit={handlerRegisterClick}>
                            <div className="mb-4">
                                <label
                                    htmlFor="username"
                                    className="block text-white font-medium mb-2"
                                >
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    className="w-[20rem] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                                    placeholder="your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="password"
                                    className="block text-white font-medium mb-2"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className="w-[20rem] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                                    placeholder="your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-[20rem] bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                            >
                                Registrar
                            </button>
                        </form>
                    )}
                    <p className="mt-4 text-center">
                        {isLogin ? "Don't you have an accout?" : "Do you already have an accout?"}{" "}
                        <button
                            onClick={toggleForm}
                            className="text-blue-500 hover:underline"
                        >
                            {isLogin ? "Register" : "Login"}
                        </button>
                    </p>
                    <p className="mt-4 text-center">
                        Are you an administrator? {" "}
                        <button
                            onClick={() => router.push("/results")}
                            className="text-blue-500 hover:underline"
                        >
                            Download the results
                        </button>
                    </p>
                </div>
            </div>
        </Base>
    );
}