import { ParsedDiff } from "diff";

type ContentViewerProps = {
    diff: ParsedDiff
}
export function ContentDiffView({ diff }: ContentViewerProps) {

    if (!diff) return (
        <div className='w-full mr-[5.5rem] text-2xl flex items-center justify-center text-textColor'>Choise one file</div>
    );

    function createView(newCode: boolean) {

        return (
            <div className='w-1/2 h-full text-textColor flex flex-col'>
                <h1 className='text-2xl ml-4 '>
                    {newCode ? 'New' : 'Old'}
                </h1>
                <pre className="whitespace-pre-wrap h-screen ">
                    {diff.hunks.map((hunk: { lines: any[]; newStart: any; }, hunkIndex: React.Key | null | undefined) => (
                        <div key={hunkIndex}>
                            {hunk.lines.map((line, lineIndex) => {
                                const lineNumber = hunk.newStart + lineIndex;
                                if (newCode ? line.startsWith('-') : line.startsWith('+')) {
                                    // Ignore removed lines
                                    return null;
                                }
                                let lineColor: string = "";
                                if (line.startsWith('+')) lineColor = 'text-green-500';
                                if (line.startsWith('-')) lineColor = 'text-red-500';
                                return (
                                    <div
                                        key={lineIndex}
                                        className={`flex space-x-4 ${lineColor}`}>
                                        <p className="text-gray-500 w-10 text-right">{lineNumber}</p>
                                        <p>{line}</p>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </pre>
            </div>
        );
    }

    return (
        <div className='flex w-full h-full overflow-scroll overflow-x-hidden ml-4'>
            {createView(false)}
            {createView(true)}
        </div>
    );
};