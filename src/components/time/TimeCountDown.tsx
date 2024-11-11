'use client';
import React, { useState, useEffect } from 'react';

interface IProps {
  time_start: Date;
  time_end: Date;
}

const TimeCountDown: React.FC<IProps> = ({ time_start, time_end }) => {
  const timeNow = new Date();
  const calculateTimeLeft = () => {
    const differenceInMillis =
      new Date(time_end).getTime() - new Date().getTime();
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

    return () => clearInterval(timer);
  }, [time_end]);

  return (
    <div className='flex items-center gap-x-4 ml-8'>
      {/* <div className='p-2 bg-red-500 rounded-md font-medium text-white'>
        {(timeLeft.days.toString()).padStart(2, '0')}
      </div>
      <div className='p-2 bg-red-500 rounded-md font-medium text-white'>
        {(timeLeft.hours.toString()).padStart(2, '0')}
      </div>
      <div className='p-2 bg-red-500 rounded-md font-medium text-white'>
        {(timeLeft.minutes.toString()).padStart(2, '0')}
      </div>
      <div className='p-2 bg-red-500 rounded-md font-medium text-white'>
        {(timeLeft.seconds.toString()).padStart(2, '0')}
      </div> */}
    </div>
  )
};

export default TimeCountDown;
