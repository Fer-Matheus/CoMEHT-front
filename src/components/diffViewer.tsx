
import React, { Key, useState } from 'react';
import { ParsedDiff } from 'diff';
import { ContentDiffView } from './contentDiffView';

type DiffViewerProps = {
    diffs: ParsedDiff[]
}
export function DiffViewer({ diffs }: DiffViewerProps) {

    const [currentDiff, setCurrentDiff] = useState<ParsedDiff>(diffs[0])
    const [currentKey, setCurrentKey] = useState<Key>(0)

    const handleClick = (diff: ParsedDiff) => {
        setCurrentDiff(diff)
        if (currentKey == 0) setCurrentKey(1);
        else setCurrentKey(0);
        
    }

    function createFileList(diff: ParsedDiff, index: Number) {
        return (
            <div>
                <button className='w-[20px] h-[5px]' onClick={() => handleClick(diff)}>
                    {index.toString()}
                </button>
            </div>
        );
    }

    return (
        <div className='w-full h-full flex'>
            <div className='w-[5rem]'>
                <p>Arquivos</p>
                <div>
                    {diffs.map((diff, index) => createFileList(diff, index))}
                </div>
            </div>
            <ContentDiffView diff={currentDiff} key={currentKey}/>
        </div>
    );
}