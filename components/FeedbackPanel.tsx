import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FeedbackPanelProps {
  feedback: string;
}

const FeedbackPanel = ({ feedback }: FeedbackPanelProps) => {
  // Parse the feedback string into structured sections
  const parseFeedback = (feedbackText: string) => {
    const sections = {
      strengths: "",
      weaknesses: "",
      improvementTips: "",
      careerRoadmap: ""
    };

    // Try to extract sections using regex
    const strengthMatch = feedbackText.match(/Strengths:?\s*\n([\s\S]+?)(?=\n\s*\n|Weaknesses:|$)/i);
    const weaknessMatch = feedbackText.match(/Weaknesses:?\s*\n([\s\S]+?)(?=\n\s*\n|Improvement|Career|$)/i);
    const tipsMatch = feedbackText.match(/Improvement (Tips|Suggestions):?\s*\n([\s\S]+?)(?=\n\s*\n|Career|$)/i);
    const roadmapMatch = feedbackText.match(/Career (Roadmap|Path):?\s*\n([\s\S]+?)$/i);

    // Assign extracted content or fallbacks
    sections.strengths = strengthMatch?.[1]?.trim() || "No strengths identified";
    sections.weaknesses = weaknessMatch?.[1]?.trim() || "No weaknesses identified";
    sections.improvementTips = tipsMatch?.[2]?.trim() || "No specific improvement tips provided";
    sections.careerRoadmap = roadmapMatch?.[2]?.trim() || "No career roadmap provided";

    return sections;
  };

  const sections = parseFeedback(feedback);

  // Helper function to format content with bullet points
  const formatContent = (content: string) => {
    const lines = content.split('\n');
    
    return lines.map((line, index) => {
      const trimmedLine = line.trim();
      if (trimmedLine.match(/^\d+\.|^\-|^\*/)) {
        return (
          <li key={index} className="flex items-start mb-1.5">
            <span className="mr-2">•</span>
            <span>{trimmedLine.replace(/^[\d\.\-\*\s]+/, '')}</span>
          </li>
        );
      }
      return <p key={index} className="mb-2.5">{trimmedLine}</p>;
    });
  };

  return (
    <Card className="border border-gray-200 shadow-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <CardTitle className="flex items-center">
          <div className="bg-white/20 p-2 rounded-lg mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span>Your Assessment Feedback</span>
          <Badge className="ml-auto bg-white text-indigo-600">Gemini AI</Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6 grid md:grid-cols-2 gap-6">
        {/* Strengths Section */}
        <div className="bg-green-50 rounded-lg p-5 border border-green-200">
          <div className="flex items-center mb-3">
            <div className="bg-green-100 p-2 rounded-full mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-green-800">Strengths</h3>
          </div>
          <div className="text-gray-700 pl-1">
            {formatContent(sections.strengths)}
          </div>
        </div>

        {/* Weaknesses Section */}
        <div className="bg-amber-50 rounded-lg p-5 border border-amber-200">
          <div className="flex items-center mb-3">
            <div className="bg-amber-100 p-2 rounded-full mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-amber-800">Weaknesses</h3>
          </div>
          <div className="text-gray-700 pl-1">
            {formatContent(sections.weaknesses)}
          </div>
        </div>

        {/* Improvement Tips Section */}
        <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
          <div className="flex items-center mb-3">
            <div className="bg-blue-100 p-2 rounded-full mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-blue-800">Improvement Tips</h3>
          </div>
          <div className="text-gray-700 pl-1">
            {formatContent(sections.improvementTips)}
          </div>
        </div>

        {/* Career Roadmap Section */}
        <div className="bg-purple-50 rounded-lg p-5 border border-purple-200">
          <div className="flex items-center mb-3">
            <div className="bg-purple-100 p-2 rounded-full mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293a1 1 0 00-1.414 0l-1 1a1 1 0 000 1.414l1.586 1.586a1 1 0 001.414 0l1-1a1 1 0 000-1.414L3.707 3.293zm9.561 11.693a1 1 0 00-1.414 1.414l1.586 1.586a1 1 0 001.414 0l1-1a1 1 0 000-1.414l-1.586-1.586z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-purple-800">Career Roadmap</h3>
          </div>
          <div className="text-gray-700 pl-1">
            {formatContent(sections.careerRoadmap)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedbackPanel;