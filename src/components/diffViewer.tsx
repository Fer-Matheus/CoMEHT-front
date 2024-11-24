
import React, { useState } from 'react';
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

    function createFileList(diff: ParsedDiff, key: number) {
        const selectedBg = diff === currentDiff ? "bg-orange-500" : "bg-[#3A506B]";
        const fileName = diff.newFileName ? diff.newFileName : diff.oldFileName;
        const fileNameVec = fileName?.split("/")
        const name = fileNameVec?.at(fileNameVec?.length-1)
        return (
            <div key={key}>
                <button className={`w-auto h-[3rem] ml-2 mt-2 ${selectedBg} rounded-md transition-transform hover:translate-x-2 flex`} onClick={() => setCurrentDiff(diff)}>
                    {name?.length! <= 28 ? name : `...${name?.substring(10)}`}
                </button>
            </div>
        );
    }

    return (
        <div className='w-full h-full flex'>
            <div className='w-auto'>
                <p className='ml-2 mt-2'>Files</p>
                <div className='flex flex-col items-start justify-center scroll'>
                    {diffs.map((diff, index) => createFileList(diff, index))}
                </div>
            </div>
            <ContentDiffView diff={currentDiff} />
        </div>
    );
}