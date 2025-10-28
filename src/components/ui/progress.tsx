// components/ProgressBar.js
import React from 'react';
type ProgressbarProps = {
  total: number,
  current: number
}
export default function ProgressBar({ total, current }:ProgressbarProps){
  const percentage = (current / total) * 100;

  return (
    <div className="w-full bg-secondary rounded-full h-[1.5rem]">
      <div
        className="bg-primary text-md font-medium text-primary-foreground text-center p-0.5 leading-none rounded-l rounded-r-md h-full"
        style={{ width: `${percentage}%` }}
      >
        
      </div>
    </div>
  );
};