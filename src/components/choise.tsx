import OkayHand from "@/assets/ok";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { CircleHelp } from "lucide-react";

type ChoiseButtonProps = {
    s: string
}
function ChoiseButton({s}:ChoiseButtonProps) {
    return (
        <div className="w-[70%] m-3 ml-4  flex items-center justify-center text-textColor text-xl">
            <button className="flex items-center justify-center w-[80%] h-full rounded-md border-2 border-borderItems bg-itemsBackgroud transition-transform hover:scale-110 focus:outline-none">
                <p className="text-2xl mr-5">
                    {s} is more
                </p>
                <OkayHand />
            </button>
        </div>
    );
}
type MoreInfoProps = {
    description: string
}
function MoreInfo({description}:MoreInfoProps) {
    return (
        <Dialog>
            <DialogTrigger>
                <button className="transition transform hover:scale-125 focus:outline-none">
                    <CircleHelp size={34} className="text-textColor" />
                </button>
            </DialogTrigger>
            <DialogContent className="bg-itemsBackgroud border-2 border-borderItems">
                <DialogHeader>
                    <DialogTitle className="text-3xl">More about:</DialogTitle>
                    <DialogDescription className="text-md text-textColor">
                        {description}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

type ChoiseProps = {
    aspect: string,
    description: string
}
export default function Choise({aspect, description}:ChoiseProps) {
    return (
        <>
            <div className="mt-5 w-[40rem] h-[5rem] flex">
                <div className="w-1/2 h-[5rem] flex items-end justify-end">
                    <p className="text-2xl text-textColor">
                        Choose the message that most looks like:
                    </p>
                </div>
                <div className="w-1/2 h-[5rem] flex">
                    <div className="w-[70%] m-3 ml-[2.7rem] rounded-md flex items-center justify-center text-textColor text-xl border-2 border-borderItems bg-itemsBackgroud">
                        {aspect}
                    </div>  
                    <MoreInfo description={description}/>
                </div>
            </div>
            <div className="mt-5 w-[40rem] h-[5rem] flex">
                <ChoiseButton s={"A"}/>
                <ChoiseButton s={"B"}/>
            </div>
        </>
    );
}