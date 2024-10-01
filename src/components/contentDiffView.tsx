import { ParsedDiff } from "diff";

type ContentViewerProps = {
    diff: ParsedDiff
}
export function ContentDiffView({ diff }: ContentViewerProps) {

    if (!diff) return (
        <div className='text-2xl flex items-center justify-center text-textColor'>Nenhum diff foi passado</div>
    );

    function createView(newCode: boolean) {

        return (
            <div className='w-full h-full text-textColor flex flex-col'>
                <h1 className='text-2xl ml-4 border-r-2 border-borderItems'>
                    {newCode ? 'Novo' : 'Antigo'}
                </h1>
                <pre className="whitespace-pre-wrap h-screen border-r-2 border-borderItems">
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
                                        <span className="text-gray-500 w-10 text-right">{lineNumber}</span>
                                        <span>{line}</span>
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
        <div className='flex h-full overflow-scroll overflow-x-hidden ml-4'>
            {createView(false)}
            {createView(true)}
        </div>
    );
};