import { ReactNode } from "react";

type DiffContainerProps = {
    children: ReactNode
}
export default function DiffContainer({children}:DiffContainerProps) {
    return (
        <div className="mt-10 h-[18rem] w-[80rem] bg-itemsBackgroud rounded-md border-2 border-borderItems ">
            {children}
        </div>
    );
}