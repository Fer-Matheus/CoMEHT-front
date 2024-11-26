
import React, { useState } from 'react';
import { ParsedDiff } from 'diff';
import { ContentDiffView } from './contentDiffView';

type DiffViewerProps = {
    currentDiff: ParsedDiff
}
export function DiffViewer({ currentDiff }: DiffViewerProps) {

    if (!currentDiff) return (
        <div className='text-2xl flex items-center justify-center text-textColor'>No diff was passed</div>
    );

    return (
        <div className='w-full h-full flex'>
            <ContentDiffView diff={currentDiff} />
        </div>
    );
}