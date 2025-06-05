import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LevelSelectorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

const LevelSelector: React.FC<LevelSelectorProps> = ({
  value,
  onChange,
  label = "Experience Level",
  className = "",
}) => {
  const levels = [
    { value: "fresher", label: "Fresher" },
    { value: "junior", label: "Junior" },
    { value: "mid-level", label: "Mid-level" },
    { value: "senior", label: "Senior" },
  ];

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full bg-white border-gray-300 hover:border-gray-400 focus:ring-indigo-500 focus:border-indigo-500">
          <SelectValue placeholder="Select level" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg">
          {levels.map((level) => (
            <SelectItem
              key={level.value}
              value={level.value}
              className="px-4 py-2 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="flex items-center">
                <span className="ml-2 text-gray-700">{level.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LevelSelector;