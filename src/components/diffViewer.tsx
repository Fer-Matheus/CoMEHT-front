import React from 'react';
import { parsePatch } from 'diff';

type DiffViewerProps = {
    rawDiff: string
}
export default function DiffViewer({ rawDiff }: DiffViewerProps) {

    const diff = parsePatch(rawDiff)[0];

    function createView(newCode: boolean) {

        return (
            <div className='w-1/2 h-full'>
                <h1 className='text-2xl ml-4'>
                    {newCode ? 'Novo' : 'Antigo'}
                </h1>
                <pre className="whitespace-pre-wrap">
                    {diff.hunks.map((hunk, hunkIndex) => (
                        <div key={hunkIndex}>
                            {hunk.lines.map((line, lineIndex) => {
                                const lineNumber = hunk.newStart + lineIndex;
                                if (newCode ? line.startsWith('-') : line.startsWith('+')) {
                                    // Ignore removed lines
                                    return null;
                                }
                                return (
                                    <div
                                        key={lineIndex}
                                        className={`flex space-x-4 ${newCode ? 'text-green-500' : ''
                                            }`}>
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
        <div className='flex'>
            {createView(false)}
            {createView(true)}
        </div>
    );
};
