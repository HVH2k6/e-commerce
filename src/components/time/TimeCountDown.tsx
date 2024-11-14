'use client';
import React, { useState, useEffect } from 'react';

interface IProps {
  time_start: Date;
  time_end: Date;
}

const TimeCountDown: React.FC<IProps> = ({ time_start, time_end }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Đánh dấu rằng component đã được mount
    setIsMounted(true);
  }, []);

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const endTime = new Date(time_end).getTime();
    const differenceInMillis = endTime - now;

    if (differenceInMillis <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const days = Math.floor(differenceInMillis / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (differenceInMillis % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (differenceInMillis % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((differenceInMillis % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clear the interval when component unmounts
    return () => clearInterval(timer);
  }, [time_end]);

  // Chỉ render component khi đã được mount
  if (!isMounted) {
    return null;
  }

  return (
    <div className='flex items-center gap-x-2 ml-8'>
      <div className='time-countdown'>
        {String(timeLeft.days).padStart(2, '0')}
      </div>
      <span>:</span>
      <div className='time-countdown'>
        {String(timeLeft.hours).padStart(2, '0')}
      </div>
      <span>:</span>
      <div className='time-countdown'>
        {String(timeLeft.minutes).padStart(2, '0')}
      </div>
      <span>:</span>
      <div className='time-countdown'>
        {String(timeLeft.seconds).padStart(2, '0')}
      </div>
    </div>
  );
};

export default TimeCountDown;
