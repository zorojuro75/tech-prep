'use client';
import { useState, useEffect, useRef } from 'react';

interface TimerProps {
  duration: number; // in minutes
  onTimeUp: () => void;
  className?: string;
}

const Timer = ({ duration, onTimeUp, className = '' }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(duration * 60);
  const [isBlinking, setIsBlinking] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Update timeLeft when duration changes
  useEffect(() => {
    setTimeLeft(duration * 60);
  }, [duration]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current as NodeJS.Timeout);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [duration, onTimeUp]);

  // Blink effect when time is running low
  useEffect(() => {
    if (timeLeft <= 30 && timeLeft > 0) {
      setIsBlinking(true);
    } else {
      setIsBlinking(false);
    }
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Determine time status color
  const getTimeColor = () => {
    if (timeLeft <= 60) return 'text-red-500';
    if (timeLeft <= 180) return 'text-amber-500';
    return 'text-gray-700';
  };

  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex flex-col items-center">
        <span 
          className={`text-xl font-bold ${getTimeColor()} ${
            isBlinking ? 'animate-pulse' : ''
          }`}
        >
          {formattedTime}
        </span>
        <span className="text-xs text-gray-500 mt-0.5">
          {timeLeft > 60 ? 'minutes left' : 'seconds left'}
        </span>
      </div>
    </div>
  );
};

export default Timer;