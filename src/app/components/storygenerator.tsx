"use client";
import React, { useRef, useState } from "react";
import { Camera, Type } from "lucide-react";
import imageCompression from "browser-image-compression";

export const StoryGenerator = () => {
  const [inputType, setInputType] = useState<"text" | "image">("text");
  const [idea, setIdea] = useState("");
  const [image, setImage] = useState<string | null>(null); // Added missing state for image preview
  const [story, setStory] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // helps with timeout issue 
      const compressedFile = await imageCompression(file, { maxSizeMB: 1, maxWidthOrHeight: 1024 });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string); // Set the image preview
      };
      reader.readAsDataURL(compressedFile);
    }
  };

  const handleCameraCapture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const generateStory = async () => {
    setIsLoading(true);
    setStory(null);
    setAudioUrl(null);
    try {
        const formData = new FormData();
        if (inputType === "text" && idea) {
          formData.append("storyIdea", idea);
        } else if (inputType === "image" && fileInputRef.current?.files?.[0]) {
          formData.append("image", fileInputRef.current.files[0]);
        }
        
      const response = await fetch("/api/spooky-story", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to generate story and audio.");
      }

      const data = await response.json();
      setStory(data.story);
      setAudioUrl(data.audioUrl);
    } catch (error) {
      console.error("Error generating story:", error);
      alert("An error occurred while generating the story. Did you forget to provide a input?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg text-white">
      <h2 className="text-2xl mb-4">Tell me a scary story</h2>
      <div className="mb-4 flex space-x-2">
        <button
          onClick={() => setInputType("text")}
          className={`px-4 py-2 rounded flex items-center ${
            inputType === "text" ? "bg-orange-500" : "bg-gray-600"
          }`}
        >
          <Type className="mr-2" /> Enter Idea
        </button>
        <button
          onClick={() => setInputType("image")}
          className={`px-4 py-2 rounded flex items-center ${
            inputType === "image" ? "bg-orange-500" : "bg-gray-600"
          }`}
        >
          <Camera className="mr-2" /> Upload/Take Photo
        </button>
      </div>

      {inputType === "text" ? (
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
              <img
                src={image}
                className="max-w-full h-auto rounded"
              />
            </div>
          )}
        </div>
      )}

      <button
        onClick={generateStory}
        className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded"
        disabled={isLoading}
      >
        {isLoading ? "Generating..." : "Generate Story"}
      </button>

      {story && (
        <div className="mt-4">
          <h3 className="text-xl mb-2">Your Spooky Story</h3>
          <p>{story}</p>
        </div>
      )}

      {audioUrl && (
        <div className="mt-4">
          <h3 className="text-xl mb-2">Listen to Your Story</h3>
          <audio controls>
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};
