import React, { useState, useEffect } from 'react';
import { PlusCircle, MinusCircle, RefreshCcw, PauseCircle, PlayCircle } from 'react-feather';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PomodoroClock = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const [audio] = useState(new Audio('https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'));

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      audio.play();
      setIsSession(!isSession);
      setTimeLeft(isSession ? breakLength * 60 : sessionLength * 60);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isSession, breakLength, sessionLength, audio]);

  useEffect(() => {
    if (isRunning) {
      toast.success('Timer is running!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      toast.info('Timer is paused', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [isRunning]);

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  const handleLengthChange = (type, change) => {
    if (isRunning) return;
    if (type === 'break') {
      setBreakLength(prev => Math.max(1, Math.min(60, prev + change)));
    } else {
      setSessionLength(prev => Math.max(1, Math.min(60, prev + change)));
      setTimeLeft((Math.max(1, Math.min(60, sessionLength + change))) * 60);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsSession(true);
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
    audio.pause();
    audio.currentTime = 0;
    toast.info('Timer has been reset', {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handlePlayPause = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex flex-col items-center justify-center text-white">
      <ToastContainer />
      <h1 className="text-4xl font-bold text-center text-white mb-8 tracking-wide">
        Pomodoro Clock
      </h1>
      <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl p-8 shadow-2xl">
        <div className="flex justify-between mb-8">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Break Length</h2>
            <div className="flex items-center justify-center">
              <button onClick={() => handleLengthChange('break', -1)} className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors duration-200">
                <MinusCircle size={24} />
              </button>
              <span className="text-2xl font-bold mx-4">{breakLength}</span>
              <button onClick={() => handleLengthChange('break', 1)} className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors duration-200">
                <PlusCircle size={24} />
              </button>
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Session Length</h2>
            <div className="flex items-center justify-center">
              <button onClick={() => handleLengthChange('session', -1)} className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors duration-200">
                <MinusCircle size={24} />
              </button>
              <span className="text-2xl font-bold mx-4">{sessionLength}</span>
              <button onClick={() => handleLengthChange('session', 1)} className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors duration-200">
                <PlusCircle size={24} />
              </button>
            </div>
          </div>
        </div>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">{isSession ? 'Session' : 'Break'}</h2>
          <div className="text-6xl font-bold">{formatTime(timeLeft)}</div>
        </div>
        <div className="flex justify-center space-x-4">
          <button onClick={handlePlayPause} className="bg-white bg-opacity-30 hover:bg-opacity-40 rounded-full p-4 transition-colors duration-200">
            {isRunning ? <PauseCircle size={32} /> : <PlayCircle size={32} />}
          </button>
          <button onClick={handleReset} className="bg-white bg-opacity-30 hover:bg-opacity-40 rounded-full p-4 transition-colors duration-200">
            <RefreshCcw size={32} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroClock;