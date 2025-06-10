import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: Date;
  title?: string;
}

export function CountdownTimer({ targetDate, title = "Sale Ends In" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center justify-center mb-4">
        <Clock className="w-5 h-5 mr-2" />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      
      <div className="grid grid-cols-4 gap-4 text-center">
        <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
          <div className="text-2xl font-bold">{timeLeft.days}</div>
          <div className="text-xs opacity-90">DAYS</div>
        </div>
        <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
          <div className="text-2xl font-bold">{timeLeft.hours}</div>
          <div className="text-xs opacity-90">HOURS</div>
        </div>
        <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
          <div className="text-2xl font-bold">{timeLeft.minutes}</div>
          <div className="text-xs opacity-90">MINS</div>
        </div>
        <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
          <div className="text-2xl font-bold">{timeLeft.seconds}</div>
          <div className="text-xs opacity-90">SECS</div>
        </div>
      </div>
    </div>
  );
}