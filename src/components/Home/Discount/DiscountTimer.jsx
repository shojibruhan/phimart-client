import React, { useEffect, useState } from 'react';

const DiscountTimer = () => {
    const targetDate= new Date().getTime() + 1000 * 60 * 60 * 24 * 25;  //25 Days Countdown

    const getRemainingTime= () => 
    {
        const now= new Date().getTime();
        const difference= (targetDate - now)
        return {
        
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60 )) % 24),
            minutes: Math.floor((difference / (1000 * 60 * 60)) % 60 ),
            seconds: Math.floor((difference / 1000) % 60 ),

        };
    }
    const [timeLeft, setTimeLeft]= useState(getRemainingTime())

    useEffect(() => 
    {
        const timer= setInterval(() =>
        {
            setTimeLeft(getRemainingTime())
        }, 1000);
        
        return ()=> clearInterval(timer); //cleanup unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
       
        
        <div className='flex justify-center md:justify-start space-x-8 text-2xl font-semibold  my-6'>
            <div>
                <span className='text-3xl text-pink-500 font-extrabold'> {timeLeft.days} </span><br/>
                <span>Days</span>
            </div>
            <div>
                <span className='text-3xl text-pink-500 font-extrabold'> {timeLeft.hours} </span><br/>
                <span>Hours</span>
            </div>
            <div>
                <span className='text-3xl text-pink-500 font-extrabold'> {timeLeft.minutes} </span><br/>
                <span>Minutes</span>
            </div>
            <div>
                <span className='text-3xl text-pink-500 font-extrabold'> {timeLeft.seconds} </span><br/>
                <span>Seconds</span>
            </div>
        
        </div>
    );
};

export default DiscountTimer;