import { GitGraph, Github } from "lucide-react";
import { ThemeToggle } from "./themeToggle";

export default function NavBar(){
    return (
        <div className="bg-itemsBackgroud w-full h-20 flex items-center justify-between px-6 shadow-md">
          <a href="/" className="flex items-center gap-4 text-textColor">
            <GitGraph size={35} className="hover:text-blue-500 transition-colors duration-200" />
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Commit Message Evaluation Helper Tool</h1>
          </a>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <a target="_blank" className="pr-2" href="https://github.com/Fer-Matheus/CoMEHT-front">
              <Github className="h-10 w-10 text-textColor hover:text-blue-500 transition-colors duration-200" size={40} />
            </a>
          </div>
        </div>
    );
}