// components/ProgressBar.js
import React from 'react';
type ProgressbarProps = {
  total: number,
  current: number
}
export default function ProgressBar({ total, current }:ProgressbarProps){
  const percentage = (current / total) * 100;

  return (
    <div className="w-full bg-slate-300 rounded-full h-[1.5rem]">
      <div
        className="bg-itemsBackgroud text-md font-medium text-blue-100 text-center p-0.5 leading-none rounded-full h-full"
        style={{ width: `${percentage}%` }}
      >
        {current == 0 ? ("") : (`${current} / ${total}`)}
      </div>
    </div>
  );
};