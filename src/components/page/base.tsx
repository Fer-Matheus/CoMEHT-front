import { ReactNode } from "react"

type BaseProps = {
    children: ReactNode
}
export function Base({children}:BaseProps){
    return (
        <div className="flex flex-col items-center bg-githubBackground w-screen h-screen">
            {children}
        </div>
    );
}