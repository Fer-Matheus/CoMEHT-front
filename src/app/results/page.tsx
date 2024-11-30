"use client"
import NavBar from "@/components/navbar";
import { Base } from "@/components/page/base";
import { DownloadResults } from "@/services/authentification";
import { useState } from "react";

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handlerDownloadClick = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await DownloadResults({ username, password });

            // Cria uma URL temporária para o blob
            const url = window.URL.createObjectURL(new Blob([response.data]));

            // Cria um link temporário para forçar o download
            const a = document.createElement("a");
            a.href = url;
            a.download = "results.csv"; // Nome do arquivo baixado
            document.body.appendChild(a);
            a.click();

            // Remove o link e libera a memória
            a.remove();
            window.URL.revokeObjectURL(url);
        }   catch (error) {
            // console.error("Erro ao baixar o arquivo:", error);
            alert(
                "You're not authorizated to download the results\n"

            )
        }
    }

    return (
        <Base>
            <NavBar />
            <div className="w-screen h-screen flex flex-col justify-center items-center">
                <div className="w-[30rem] h-[22rem] bg-itemsBackgroud border border-borderItems rounded-lg p-2">
                    <h2 className="text-3xl font-bold mb-6 text-center">
                        Results
                    </h2>
                    <form className="flex flex-col justify-center items-center" onSubmit={handlerDownloadClick}>
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
                            Download
                        </button>
                    </form>
                </div>
            </div>
        </Base>
    );
}