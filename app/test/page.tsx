"use client";
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { generateQuestions, type GeneratedQuestion } from '@/lib/gemini';
import QuestionCard from '@/components/QuestionCard';
import Timer from '@/components/Timer';
import ProgressBar from '@/components/ProgressBar';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { calculateScore } from '@/lib/utils';

export default function TestPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [timeUp, setTimeUp] = useState(false);
  
  // Get query parameters
  const role = searchParams.get('role') || 'developer';
  const level = searchParams.get('level') as 'fresher' | 'junior' | 'mid-level' | 'senior' || 'junior';
  const testType = searchParams.get('type'); // 'custom' for custom tests

  // Initialize answers array
  useEffect(() => {
    if (questions.length > 0) {
      setUserAnswers(Array(questions.length).fill(null));
    }
  }, [questions]);

  // Fetch questions based on role and level
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        
        // Check if it's a custom test
        if (testType === 'custom') {
          const customTest = sessionStorage.getItem('customTest');
          if (customTest) {
            const { questions } = JSON.parse(customTest);
            setQuestions(questions);
          } else {
            throw new Error('Custom test not found. Please create a new one.');
          }
        } 
        // Standard role-based test
        else {
          const generatedQuestions = await generateQuestions(
            role,
            level,
            'mcq', // Default to MCQ for now
            20 // Generate 40 questions
          );
          setQuestions(generatedQuestions);
        }
      } catch (err) {
        console.error('Failed to generate questions:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
        toast.error('Failed to load test', {
          description: 'Please try again later',
          action: {
            label: 'Go Home',
            onClick: () => router.push('/'),
          },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [role, level, testType, router]);

  // Handle answer selection
  const handleAnswerSelect = (selectedOption: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = selectedOption;
    setUserAnswers(newAnswers);
  };

  // Handle test submission
  const handleSubmit = () => {
    // Calculate score
    const { score, correct } = calculateScore(questions, userAnswers);
    
    // Prepare test results
    const testResults = {
      questions,
      userAnswers,
      score,
      correct,
      total: questions.length,
      role,
      level,
      testType,
      timestamp: new Date().toISOString()
    };
    
    // Store results in session storage
    sessionStorage.setItem('testResults', JSON.stringify(testResults));
    
    // Redirect to results page
    router.push('/result');
  };

  // Handle time up
  const handleTimeUp = () => {
    setTimeUp(true);
    toast.warning('Time is up!', {
      description: 'Your test will be submitted automatically',
      duration: 3000,
    });
    
    // Submit after 3 seconds
    setTimeout(handleSubmit, 3000);
  };

  // Render loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 text-indigo-600 animate-spin" />
          <p className="mt-4 text-lg text-gray-600">
            Generating {testType === 'custom' ? 'custom' : `${level} ${role}`} test...
          </p>
          <p className="text-sm text-gray-500 mt-2">
            This may take a few seconds
          </p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md text-center bg-white p-8 rounded-xl shadow-md border border-red-100">
          <div className="bg-red-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mt-4">Test Failed to Load</h2>
          <p className="text-gray-600 mt-2">{error}</p>
          <Button 
            onClick={() => router.push('/')}
            className="mt-6 bg-indigo-600 hover:bg-indigo-700"
          >
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  // Render test interface
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Test Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {testType === 'custom' ? 'Custom Test' : `${role.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Assessment`}
              </h1>
              <p className="text-sm text-gray-600">
                Level: <span className="font-medium">{level.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('-')}</span>
              </p>
            </div>
            
            <div className="flex items-center gap-6">
              <Timer 
                duration={15} 
                onTimeUp={handleTimeUp} 
                className="bg-gray-100 px-4 py-2 rounded-lg"
              />
              
              <Button 
                variant="outline"
                onClick={handleSubmit}
                disabled={timeUp}
                className="border-indigo-600 text-indigo-600 hover:bg-indigo-50"
              >
                Submit Test
              </Button>
            </div>
          </div>
          
          <div className="mt-4">
            <ProgressBar 
              current={currentQuestionIndex}
              total={questions.length}
              label="Question Progress"
            />
          </div>
        </div>
      </header>

      {/* Test Content */}
      <main className="container max-w-4xl mx-auto px-4 py-8">
        {questions.length > 0 && currentQuestionIndex < questions.length ? (
          <QuestionCard
            question={questions[currentQuestionIndex].question}
            type={questions[currentQuestionIndex].codeSnippet ? "coding" : "mcq"}
            options={questions[currentQuestionIndex].options}
            codeSnippet={questions[currentQuestionIndex].codeSnippet}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            onAnswerSelect={handleAnswerSelect}
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No questions available</p>
          </div>
        )}

        {/* Navigation Controls */}
        <div className="mt-8 flex justify-between max-w-4xl mx-auto">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          
          <Button
            onClick={() => {
              if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
              } else {
                handleSubmit();
              }
            }}
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Submit Test'}
          </Button>
        </div>
      </main>

      {/* Time Up Overlay */}
      {timeUp && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl max-w-md text-center animate-pulse">
            <div className="bg-red-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mt-4">Time's Up!</h2>
            <p className="text-gray-600 mt-2">
              Your test is being submitted automatically
            </p>
            <div className="mt-4">
              <Loader2 className="h-8 w-8 text-indigo-600 animate-spin mx-auto" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}