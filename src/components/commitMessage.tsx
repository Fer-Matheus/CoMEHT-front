type CommitMessageProps = {
    title: string,
    message: string
}
export default function CommitMessage({ title, message}:CommitMessageProps){
    return (
        <div className="flex flex-col w-full h-full items-center text-textColor">
            <h1 className="text-xl">{title}</h1>
            <div className="mt-1 w-[95%] h-[10rem] bg-itemsBackgroud rounded-md border-2 border-borderItems flex items-center justify-center text-justify p-5">
              {message}
            </div>
          </div>
    );
} 