import { GoogleGenerativeAI, type GenerateContentResult } from "@google/generative-ai";

// Define question types
export type QuestionType = "mcq" | "coding";
export type DifficultyLevel = "fresher" | "junior" | "mid-level" | "senior";

// Question interface
export interface GeneratedQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct option
  codeSnippet?: string; // Only for coding questions
  explanation?: string; // Optional explanation
}

// Gemini API configuration
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  throw new Error("Missing NEXT_PUBLIC_GEMINI_API_KEY environment variable");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateQuestions(
  role: string,
  level: DifficultyLevel,
  type: QuestionType,
  count: number = 40
): Promise<GeneratedQuestion[]> {
  // Validate question count
  if (count < 1 || count > 50) {
    throw new Error("Question count must be between 1 and 50");
  }

  // Construct the prompt
  const prompt = `
  Generate exactly ${count} ${type === "coding" ? "coding-based" : "theoretical"} multiple-choice questions for a ${level} level ${role} position.
  
  Requirements:
  1. Format response as a valid JSON array of objects
  2. Each question object should have:
      - "question": string (question text)
      - "options": string[] (exactly 4 options)
      - "correctAnswer": number (0-based index of correct option)
      ${type === "coding" ? '- "codeSnippet": string (relevant code snippet)' : ''}
      - "explanation": string (brief explanation of the answer)
  
  3. Questions should test ${level}-level knowledge appropriate for ${role} role
  4. For coding questions: provide executable code snippets and questions about output, errors, or optimizations
  5. For theoretical questions: focus on core concepts and best practices
  6. Include diverse topics relevant to the role
  
  Example ${type === "coding" ? "coding" : "theoretical"} question format:
  ${getExampleFormat(type)}
  
  Return ONLY the JSON array. Do not include any additional text or markdown.
  `;

  try {
    // Call Gemini API
    const result: GenerateContentResult = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Extract JSON from response
    const jsonStart = text.indexOf("[");
    const jsonEnd = text.lastIndexOf("]") + 1;
    const jsonString = text.substring(jsonStart, jsonEnd);

    // Parse and validate response
    const questions: GeneratedQuestion[] = JSON.parse(jsonString);
    validateQuestions(questions, count, type);
    
    return questions;
  } catch (error) {
    console.error("Error generating questions:", error);
    throw new Error("Failed to generate questions. Please try again later.");
  }
}

// Helper function to get example format
function getExampleFormat(type: QuestionType): string {
  if (type === "coding") {
    return `{
      "question": "What does this React component output?",
      "codeSnippet": "function MyComponent() {\\n  const [count, setCount] = useState(0);\\n  useEffect(() => {\\n    setCount(c => c + 1);\\n  }, []);\\n  return <div>{count}</div>;\\n}",
      "options": [
        "0",
        "1",
        "Infinitely increasing number",
        "Throws an error"
      ],
      "correctAnswer": 1,
      "explanation": "useEffect runs once after initial render, incrementing count to 1"
    }`;
  }

  return `{
    "question": "What is the purpose of React hooks?",
    "options": [
      "To handle CSS styling in components",
      "To manage state and side effects in functional components",
      "To create class-based components",
      "To handle routing in React applications"
    ],
    "correctAnswer": 1,
    "explanation": "Hooks allow functional components to use state and other React features"
  }`;
}

// Validate the structure of returned questions
function validateQuestions(
  questions: any[],
  expectedCount: number,
  type: QuestionType
): asserts questions is GeneratedQuestion[] {
  if (!Array.isArray(questions)) {
    throw new Error("Response is not an array");
  }

  if (questions.length !== expectedCount) {
    throw new Error(`Expected ${expectedCount} questions, got ${questions.length}`);
  }

  for (const [index, q] of questions.entries()) {
    if (!q.question || typeof q.question !== "string") {
      throw new Error(`Question ${index + 1} missing question text`);
    }

    if (!q.options || !Array.isArray(q.options) || q.options.length !== 4) {
      throw new Error(`Question ${index + 1} must have exactly 4 options`);
    }

    if (typeof q.correctAnswer !== "number" || q.correctAnswer < 0 || q.correctAnswer > 3) {
      throw new Error(`Question ${index + 1} has invalid correctAnswer index`);
    }

    if (type === "coding" && (!q.codeSnippet || typeof q.codeSnippet !== "string")) {
      throw new Error(`Coding question ${index + 1} missing codeSnippet`);
    }
  }
}

export interface TestResult {
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

/**
 * Generates personalized feedback based on test results
 * @param testResult Test result data
 * @returns Gemini-generated feedback string
 */
export async function generateFeedback(testResult: TestResult): Promise<string> {
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Construct the prompt
  const prompt = `
  You are a technical career coach helping a developer prepare for job interviews. 
  The candidate just completed a ${testResult.level} level ${testResult.role} assessment and scored ${testResult.score}% (${testResult.correct} out of ${testResult.total}).

  Here are the test details:
  ${testResult.questions.map((q, index) => `
    Question ${index + 1}: ${q.question}
    ${q.codeSnippet ? `Code Snippet:\n${q.codeSnippet}` : ''}
    Correct Answer: ${q.options[q.correctAnswer]}
    User's Answer: ${testResult.userAnswers[index] !== null ? q.options[testResult.userAnswers[index]!] : 'Unanswered'}
    ${q.explanation ? `Explanation: ${q.explanation}` : ''}
  `).join('\n')}

  Generate personalized feedback including:
  1. Performance summary in 2-3 sentences
  2. Key strengths (based on correctly answered questions)
  3. Key weaknesses (based on incorrect/unanswered questions)
  4. Improvement suggestions (specific topics to study, resources, practice tips)
  5. Career roadmap (timeline with milestones for skill improvement and job search)

  Structure the feedback using these exact section headings:
  - Performance Summary
  - Strengths
  - Weaknesses
  - Improvement Suggestions
  - Career Roadmap

  Be encouraging but honest. For weaknesses, focus on 2-3 critical areas. For the roadmap, provide a realistic 3-6 month plan.
  `;

  try {
    const result: GenerateContentResult = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating feedback:", error);
    throw new Error("Failed to generate feedback. Please try again later.");
  }
}