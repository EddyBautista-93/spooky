"use client";
import React, { useRef, useState } from "react";
import { Camera, Type } from "lucide-react";
import { Navbar } from "./components/navbar";

const PomodoroTimer = () => {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time]);
  const toggleTimer = () => {
    setIsActive(!isActive);
  };
  const resetTimer = () => {
    setTime(25 * 60);
    setIsActive(false);
  };
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };
  return (
    // UI for the timer
    <div className="bg-gray-800 p-4 rounded-lg text-white text-center">
      <h2 className="text-2xl mb-4">Pomodoro Timer</h2>
      <div className="text-4xl mb-4">{formatTime(time)}</div>
      <div className="space-x-2">
        <button
          onClick={toggleTimer}
          className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded"
        >
          {isActive ? "Pause" : "Start"}
        </button>
        <button
          onClick={resetTimer}
          className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
};


const StoryGenerator = () => {
  const [inputType, setInputType] = useState<'text' | 'image'>('text')
  const [idea, setIdea] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  
}



export default function Home() {
  return <h1></h1>;
}
