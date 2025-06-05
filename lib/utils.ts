import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Utility functions for TechPrep application
 */

/**
 * Shuffles an array using Fisher-Yates algorithm
 * @param array Array to shuffle
 * @returns New shuffled array
 */
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

/**
 * Calculates test score based on correct answers
 * @param questions Array of question objects
 * @param answers User's answers (array of option indices)
 * @returns Object containing score, correct count, and total
 */
export function calculateScore(
  questions: { correctAnswer: number }[],
  answers: (number | null)[]
): { score: number; correct: number; total: number } {
  const total = questions.length;
  let correct = 0;

  answers.forEach((answer, index) => {
    if (answer === questions[index].correctAnswer) {
      correct++;
    }
  });

  const score = total > 0 ? Math.round((correct / total) * 100) : 0;
  
  return { score, correct, total };
}

/**
 * Capitalizes the first letter of each word in a string
 * @param str Input string
 * @returns Capitalized string
 */
export function capitalize(str: string): string {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Formats a role string to a display-friendly format
 * @param role Tech role string (e.g., "frontend_developer")
 * @returns Formatted string (e.g., "Frontend Developer")
 */
export function formatRole(role: string): string {
  return capitalize(role.replace(/_/g, ' '));
}

/**
 * Formats time in seconds to MM:SS format
 * @param seconds Time in seconds
 * @returns Formatted time string
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Truncates text to a specified length with ellipsis
 * @param text Input text
 * @param maxLength Maximum allowed length
 * @returns Truncated text
 */
export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Sanitizes input by removing potentially harmful HTML
 * @param input User input string
 * @returns Sanitized string
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/**
 * Converts difficulty level to display-friendly format
 * @param level Difficulty level
 * @returns Formatted level
 */
export function formatLevel(level: string): string {
  return level.includes('-') 
    ? capitalize(level.replace('-', ' ')) 
    : capitalize(level);
}

/**
 * Generates a unique session ID
 * @returns 8-character alphanumeric ID
 */
export function generateSessionId(): string {
  return Math.random().toString(36).substring(2, 10);
}