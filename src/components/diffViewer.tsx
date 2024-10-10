
import React, { Key, useState } from 'react';
import { ParsedDiff } from 'diff';
import { ContentDiffView } from './contentDiffView';

type DiffViewerProps = {
    diffs: ParsedDiff[] | undefined
}
export function DiffViewer({ diffs }: DiffViewerProps) {

    if (!diffs) return (
        <div className='text-2xl flex items-center justify-center text-textColor'>No diff was passed</div>
    );

    const [currentDiff, setCurrentDiff] = useState<ParsedDiff>(diffs[0])

    function createFileList(diff: ParsedDiff, index: Number) {
        const selectedBg = diff === currentDiff ? "bg-orange-500" : "bg-[#3A506B]";
        return (
            <div>
                <button className={`w-[6rem] h-[2rem] ml-2 mt-2 ${selectedBg} rounded-md transition-transform hover:translate-x-2`} onClick={() => setCurrentDiff(diff)}>
                    {index.toString()}
                </button>
            </div>
        );
    }

    return (
        <div className='w-full h-full flex'>
            <div className='w-[6rem]'>
                <p className='ml-2 mt-2'>Files</p>
                <div className='flex flex-col items-center justify-center'>
                    {diffs.map((diff, index) => createFileList(diff, index))}
                </div>
            </div>
            <ContentDiffView diff={currentDiff} />
        </div>
    );
}