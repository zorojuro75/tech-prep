'use client';
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Check } from "lucide-react";

interface QuestionCardProps {
  question: string;
  type: "mcq" | "coding";
  options: string[];
  codeSnippet?: string;
  questionNumber: number;
  totalQuestions: number;
  onAnswerSelect: (selectedOption: number) => void;
}

const QuestionCard = ({
  question,
  type,
  options,
  codeSnippet,
  questionNumber,
  totalQuestions,
  onAnswerSelect,
}: QuestionCardProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
    onAnswerSelect(index);
  };

  const copyToClipboard = () => {
    if (codeSnippet) {
      navigator.clipboard.writeText(codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card className="w-full max-w-3xl border border-gray-200 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-semibold text-gray-800">
            Question {questionNumber} of {totalQuestions}
          </CardTitle>
          <Badge variant="outline" className="px-3 py-1 text-sm font-medium">
            {type === "coding" ? "Coding Problem" : "Multiple Choice"}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Question Text */}
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-700 text-lg">{question}</p>
        </div>
        
        {/* Code Snippet */}
        {codeSnippet && (
          <div className="relative">
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{codeSnippet}</code>
            </pre>
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2 text-gray-300 hover:text-white"
              onClick={copyToClipboard}
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        )}
        
        {/* Options */}
        <div className="grid gap-3">
          {options.map((option, index) => (
            <Button
              key={index}
              variant={selectedOption === index ? "secondary" : "outline"}
              className={`flex items-start justify-start h-auto py-3 px-4 text-left whitespace-normal ${
                selectedOption === index
                  ? "border-2 border-indigo-500 bg-indigo-50"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => handleOptionSelect(index)}
            >
              <span className="font-medium mr-3 text-gray-500">{String.fromCharCode(65 + index)}.</span>
              <span className="font-normal text-gray-700">{option}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;