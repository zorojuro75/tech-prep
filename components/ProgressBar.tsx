import React from "react";

interface ProgressBarProps {
  current: number; // Current question index (0-based)
  total: number;   // Total number of questions
  label?: string;  // Optional custom label
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  label = "Progress",
}) => {
  // Calculate progress percentage
  const progress = Math.min(100, Math.max(0, (current / total) * 100));
  // Calculate human-readable count (current is 0-based index)
  const answeredCount = current;
  
  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-medium text-gray-700">
          {answeredCount}/{total} {answeredCount === 1 ? "question" : "questions"}
        </span>
      </div>
      
      {/* Progress bar container */}
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        {/* Animated progress bar */}
        <div 
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {/* Progress bar inner with subtle shine effect */}
          <div className="h-full w-full relative">
            <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-20"></div>
          </div>
        </div>
      </div>
      
      {/* Optional progress indicators */}
      <div className="flex justify-between text-xs text-gray-500">
        <span>0%</span>
        <span className="text-indigo-600 font-medium">{progress.toFixed(0)}%</span>
        <span>100%</span>
      </div>
    </div>
  );
};

export default ProgressBar;