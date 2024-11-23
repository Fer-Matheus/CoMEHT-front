import OkayHand from "@/assets/ok";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { CircleHelp } from "lucide-react";

type ChoiseButtonProps = {
    s: string
}

function ChoiseButton({ s }: ChoiseButtonProps) {
    return (
        <div className="w-[15em] h-[3rem] flex text-textColor text-xl">
            <button className="flex items-center justify-center w-[80%] h-full rounded-md border-2 border-borderItems bg-itemsBackgroud transition-transform hover:scale-110 focus:outline-none aria-pressed:after:bg-white">
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
export function MoreInfo({ description }: MoreInfoProps) {
    return (
        <Dialog>
            <DialogTrigger>
                <div className="transition transform hover:scale-125 focus:outline-none">
                    <CircleHelp size={34} className="text-textColor" />
                </div>
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
export default function Choise({ aspect, description }: ChoiseProps) {
    return (
        <div className="w-full flex flex-col items-center">
            <div className="mt-5 w-[40rem] h-[5rem] flex items-center justify-center">
                <div className="w-1/2 h-[5rem] flex items-center justify-start">
                    <p className="text-auto text-textColor">
                    Choose the message that most looks like:
                    </p>
                </div>
                <div className="w-1/2 h-[5rem] flex">
                    <div className="w-[70%] m-3 ml-[1rem] rounded-md flex items-center justify-center text-white text-xl border-2 border-borderItems bg-[#3A506B]">
                        {aspect}
                    </div>
                    <MoreInfo description={description} />
                </div>
            </div>
            <div className="w-full flex items-center justify-center">
                <div className="mt-5 w-[40rem] h-[5rem] flex justify-between">
                    <div className="ml-[4rem]">
                        <ChoiseButton s={"A"} />
                    </div>
                    <div className="-ml-[55px] ">
                        <ChoiseButton s={"B"} />
                    </div>
                </div>
            </div>
        </div>
    );
}