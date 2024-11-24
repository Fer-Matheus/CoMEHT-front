import { Options } from "@/models/result";
type OptionsProps = {
    options: Options[]
}
export function showOption(option: Options, index: number) {
    return (
        <div key={index} className="w-[24rem] h-[2rem] flex items-center text-textColor border border-borderItems p-2">
            <div className="flex w-[30rem] h-[1rem]">
                <span className="w-[25rem]">Aspect: {option.aspect}</span>
                <span className="w-[25rem]">Your Choise: {option.chosen_option}</span>
            </div>
        </div>
    )
}

export function ShowOptions({ options }: OptionsProps) {
    return (
        <div>
            {options.map((option, index) => showOption(option, index))}
        </div>
    )
}