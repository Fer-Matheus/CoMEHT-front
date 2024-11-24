import { GitGraph, Github } from "lucide-react";

type NavBarProps = {
    link: string
}
export default function NavBar({link}:NavBarProps){
    return (
        <div className="bg-itemsBackgroud w-full h-[4rem] flex items-center justify-between">
          <div className="flex text-textColor justify-center w-[20rem]">
          <h1 className="text-3xl ml-20">CommiTinder</h1>
          <GitGraph size={35}/>
          </div>
          <a className="pr-10 pt-3" href={link}>
            <Github className="h-[3rem] w-[3rem] text-textColor" size={40} />
          </a>
        </div>
    );
}