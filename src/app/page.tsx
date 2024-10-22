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
      <div className="bg-gray-800 p-4 rounded-lg text-white text-center"></div>
    </div>
  );
};

const StoryGenerator = () => {
  const [inputType, setInputType] = useState<'text' | 'image'>('text')
  const [idea, setIdea] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCameraCapture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const generateStory = () => {
    // Here you would typically call an API to generate a story based on the idea or image
    if (inputType === 'text') {
      console.log('Generating story based on idea:', idea)
    } else {
      console.log('Generating story based on image:', image)
    }
    alert('Story generation feature is not implemented in this demo.')
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg text-white">
      <h2 className="text-2xl mb-4">Tell me a scary story</h2>
      <div className="mb-4 flex space-x-2">
        <button
          onClick={() => setInputType('text')}
          className={`px-4 py-2 rounded flex items-center ${
            inputType === 'text' ? 'bg-orange-500' : 'bg-gray-600'
          }`}
        >
          <Type className="mr-2" /> Enter Idea
        </button>
        <button
          onClick={() => setInputType('image')}
          className={`px-4 py-2 rounded flex items-center ${
            inputType === 'image' ? 'bg-orange-500' : 'bg-gray-600'
          }`}
        >
          <Camera className="mr-2" /> Upload/Take Photo
        </button>
      </div>
      {inputType === 'text' ? (
        <textarea
          className="w-full p-2 mb-4 text-black rounded"
          placeholder="Enter an idea for your scary story..."
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
        />
      ) : (
        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            ref={fileInputRef}
          />
          <button
            onClick={handleCameraCapture}
            className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded flex items-center"
          >
            <Camera className="mr-2" /> Upload or Take Photo
          </button>
          {image && (
            <div className="mt-4">
              <img src={image} alt="Uploaded" className="max-w-full h-auto rounded" />
            </div>
          )}
        </div>
      )}
      <button
        onClick={generateStory}
        className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded"
      >
        Generate Story
      </button>
    </div>
  )
}

export default function Home() {
  const [isHovered, setIsHovered] = useState(false)
  const [showTimer, setShowTimer] = useState(false)
  const [showStoryGenerator, setShowStoryGenerator] = useState(false)
  return (
<div className="relative min-h-screen bg-slate-900">
      {/* <Navbar /> */}
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div 
          className="ghost-container mb-8 relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="ghost">
            <div className="ghost-body">
              <div className="eyes">
                <div className="eye"></div>
                <div className="eye"></div>
              </div>
            </div>
            <div className="ghost-tail">
              <div className="ghost-tail-1"></div>
              <div className="ghost-tail-2"></div>
              <div className="ghost-tail-3"></div>
            </div>
          </div>
          {isHovered && (
            <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm whitespace-nowrap">
              Happy Halloween!
            </div>
          )}
        </div>
        <div className="space-x-4 mb-8">
          <button 
            onClick={() => {
              setShowStoryGenerator(!showStoryGenerator)
              setShowTimer(false)
            }} 
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
          >
            Tell me a scary story
          </button>
          <button 
            onClick={() => {
              setShowTimer(!showTimer)
              setShowStoryGenerator(false)
            }} 
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
          >
            Study with me
          </button>
        </div>
        {showStoryGenerator && (
          <div className="mb-8 w-full max-w-md">
            <StoryGenerator />
          </div>
        )}
{showTimer && (
          <div className="mb-8 w-full max-w-md">
            <PomodoroTimer />
            <div className="mt-8 bg-gray-800 p-4 rounded-lg text-center">
              <h2 className="text-xl mb-4 text-white content-center">Spooky Study Music</h2>
              <iframe 
                className="rounded-lg w-full"
                src="https://open.spotify.com/embed/album/4eKHRNqEMM5rNIXfx7GpmF?utm_source=generator" 
                height="80" 
                frameBorder="0" 
                allowFullScreen 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
              ></iframe>
            </div>
          </div>
        )}
      </div> 
    </div>
  );
}
