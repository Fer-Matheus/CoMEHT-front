type CommitMessageProps = {
    title: string,
    message: string
}
export default function CommitMessage({ title, message}:CommitMessageProps){

    const sty = message.split(" ").length < 20 ? "flex justify-center items-center" : "";

    return (
        <div className="flex flex-col w-1/2 h-full items-center text-textColor mt-1 ">
            <h1 className="text-xl">{title}</h1>
            <div className="w-[95%] h-[20rem] bg-itemsBackgroud rounded-md border-2 border-borderItems ">
            <p className={` ${sty} w-full h-40 overflow-auto`}>
            {message}
            </p>
            </div>
          </div>
    );
} 