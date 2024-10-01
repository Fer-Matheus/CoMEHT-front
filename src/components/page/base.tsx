import { ReactNode } from "react"
import { JetBrains_Mono} from "next/font/google";

const jetBrains = JetBrains_Mono({
    subsets: ['latin'],
    weight: ['400', '700']
})

type BaseProps = {
    children: ReactNode
}
export function Base({children}:BaseProps){
    return (
        <div className={`flex flex-col items-center bg-githubBackground w-screen h-screen ${jetBrains.className}`}>
            {children}
        </div>
    );
}