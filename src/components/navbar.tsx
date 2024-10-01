import { Github } from "lucide-react";

type NavBarProps = {
    link: string
}
export default function NavBar({link}:NavBarProps){
    return (
        <div className="bg-itemsBackgroud w-full h-[4rem] flex items-center justify-between">
          <h1 className="text-3xl ml-20 text-textColor">CommiTinder</h1>
          <a className="pr-10 pt-3" href={link}>
            <Github className="h-[3rem] w-[3rem] text-textColor" size={40} />
          </a>
        </div>
    );
}