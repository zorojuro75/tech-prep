"use client";
import { useEffect, useState } from 'react';
import FeedbackPanel from '@/components/FeedbackPanel';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generateFeedback } from '@/lib/gemini';
import { formatLevel, formatRole } from '@/lib/utils';
import { Loader2, ArrowLeft, Trophy, BarChart, Calendar, BookOpen, ClipboardList } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Type for test results
interface TestResult {
  score: number;
  correct: number;
  total: number;
  role: string;
  level: string;
  testType?: string;
  timestamp: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
    codeSnippet?: string;
    explanation?: string;
  }[];
  userAnswers: (number | null)[];
}

export default function ResultPage() {
  const router = useRouter();
  const [results, setResults] = useState<TestResult | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load test results from session storage
  useEffect(() => {
    const storedResults = sessionStorage.getItem('testResults');
    if (storedResults) {
      try {
        const parsedResults: TestResult = JSON.parse(storedResults);
        setResults(parsedResults);
        
        // Generate feedback using Gemini
        generateResultsFeedback(parsedResults);
      } catch (err) {
        setError('Failed to parse test results');
        setLoading(false);
      }
    } else {
      setError('No test results found. Please complete a test first.');
      setLoading(false);
    }
  }, []);

  // Generate feedback using Gemini API
  const generateResultsFeedback = async (testResults: TestResult) => {
    try {
      setLoading(true);
      const feedbackText = await generateFeedback(testResults);
      setFeedback(feedbackText);
      setLoading(false);
    } catch (err) {
      console.error('Failed to generate feedback:', err);
      setError('Failed to generate personalized feedback. Please try again later.');
      setLoading(false);
    }
  };

  // Restart test with same parameters
  const restartTest = () => {
    if (!results) return;
    
    // Clear previous results
    sessionStorage.removeItem('testResults');
    
    // Redirect to test page with same parameters
    const queryParams = new URLSearchParams();
    if (results.testType === 'custom') {
      router.push('/custom-category');
    } else {
      queryParams.append('role', results.role);
      queryParams.append('level', results.level);
      router.push(`/test?${queryParams.toString()}`);
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 text-indigo-600 animate-spin" />
          <p className="mt-4 text-lg text-gray-600">
            Generating personalized feedback...
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Analyzing your performance and creating improvement plan
          </p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error || !results) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md text-center bg-white p-8 rounded-xl shadow-md border border-red-100">
          <div className="bg-red-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mt-4">Results Not Found</h2>
          <p className="text-gray-600 mt-2">{error || 'Please complete a test to view results'}</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                Return to Home
              </Button>
            </Link>
            <Button 
              variant="outline"
              onClick={() => router.back()}
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate additional metrics
  const percentage = results.score;
  const formattedDate = new Date(results.timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  const formattedTime = new Date(results.timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <Link href="/">
              <Button variant="ghost" className="text-indigo-600 pl-0">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mt-2">
              Your Assessment Results
            </h1>
            <p className="text-gray-600">
              {formattedDate} at {formattedTime}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button 
              onClick={restartTest}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Retake Test
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.print()}
            >
              Print Results
            </Button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <Card className="border border-indigo-200 bg-indigo-50">
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <Trophy className="h-6 w-6 text-indigo-600 mr-2" />
                <CardTitle className="text-lg font-semibold text-indigo-800">Performance Summary</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-4xl font-bold text-gray-900">{percentage}%</div>
                  <p className="text-gray-600">Overall Score</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">
                    {results.correct}/{results.total}
                  </p>
                  <p className="text-gray-600">Correct Answers</p>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Test Type</span>
                  <span>{results.testType === 'custom' ? 'Custom Test' : formatRole(results.role)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Experience Level</span>
                  <span>{formatLevel(results.level)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-blue-200 bg-blue-50">
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <BarChart className="h-6 w-6 text-blue-600 mr-2" />
                <CardTitle className="text-lg font-semibold text-blue-800">Score Breakdown</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Core Concepts</span>
                    <span className="text-sm font-medium text-gray-700">
                      {Math.min(Math.floor(percentage * 0.7), 70)}/70
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${Math.min(percentage * 0.7, 70)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Problem Solving</span>
                    <span className="text-sm font-medium text-gray-700">
                      {Math.min(Math.floor(percentage * 0.2), 20)}/20
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-green-500 h-2.5 rounded-full" 
                      style={{ width: `${Math.min(percentage * 0.2, 20)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Best Practices</span>
                    <span className="text-sm font-medium text-gray-700">
                      {Math.min(Math.floor(percentage * 0.1), 10)}/10
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-amber-500 h-2.5 rounded-full" 
                      style={{ width: `${Math.min(percentage * 0.1, 10)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-amber-200 bg-amber-50">
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <Calendar className="h-6 w-6 text-amber-600 mr-2" />
                <CardTitle className="text-lg font-semibold text-amber-800">Recommendations</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="bg-amber-100 rounded-full p-1 mt-0.5 mr-2">
                    <BookOpen className="h-4 w-4 text-amber-600" />
                  </div>
                  <span>Focus on core concepts for 2 weeks</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-amber-100 rounded-full p-1 mt-0.5 mr-2">
                    <ClipboardList className="h-4 w-4 text-amber-600" />
                  </div>
                  <span>Complete 1 practice project</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-amber-100 rounded-full p-1 mt-0.5 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <span>Review 5 algorithm patterns</span>
                </li>
              </ul>
              <div className="mt-4 pt-3 border-t border-amber-200">
                <p className="text-sm text-amber-800 font-medium">
                  Estimated readiness: {percentage > 80 ? '2 weeks' : percentage > 60 ? '1 month' : '2 months'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feedback Panel */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Personalized Feedback & Improvement Plan
          </h2>
          {feedback ? (
            <FeedbackPanel feedback={feedback} />
          ) : (
            <Card className="border border-gray-200">
              <CardContent className="py-12 text-center">
                <p className="text-gray-600">No feedback available</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Your Next Career Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border border-indigo-100">
              <CardHeader>
                <div className="bg-indigo-100 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <CardTitle className="text-lg">Learning Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Advanced React Patterns Course</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>System Design Primer</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>TypeScript Deep Dive</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border border-purple-100">
              <CardHeader>
                <div className="bg-purple-100 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <CardTitle className="text-lg">Practice Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Build a fullstack e-commerce app</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Create a real-time dashboard</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Implement an authentication system</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border border-pink-100">
              <CardHeader>
                <div className="bg-pink-100 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <CardTitle className="text-lg">Interview Prep</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>50 Algorithm Challenges</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Behavioral Questions Guide</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Mock Interview Sessions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}