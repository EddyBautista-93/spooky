"use client";
import React, { useState } from "react";
import { PomodoroTimer } from "./components/pomodoro";
import { StoryGenerator } from "./components/storygenerator";
import { Ghost } from "./components/ghost";

export default function Home() {
  const [showTimer, setShowTimer] = useState(false);
  const [showStoryGenerator, setShowStoryGenerator] = useState(false);

  return (
    <div className="relative min-h-screen bg-slate-900">
      <div className="flex flex-col items-center justify-center min-h-screen">
       <Ghost />
        <div className="space-x-4 mb-8">
          <button
            onClick={() => {
              setShowStoryGenerator(!showStoryGenerator);
              setShowTimer(false);
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
          >
            Tell me a scary story
          </button>
          <button
            onClick={() => {
              setShowTimer(!showTimer);
              setShowStoryGenerator(false);
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
              <h3 className="text-xl mb-4 text-white">Spooky Study Music</h3>
              <iframe
                width="100%"
                height="300"
                allow="autoplay"
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1689494889&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                className="rounded-lg"
              ></iframe>
              <div className="text-xs text-gray-400 mt-2 break-words">
                <a
                  href="https://soundcloud.com/user-203264501"
                  title="chaoticlove"
                  target="_blank"
                  className="text-gray-400 hover:text-gray-300"
                >
                  chaoticlove
                </a>{" "}
                ·{" "}
                <a
                  href="https://soundcloud.com/user-203264501/sets/spooky-halloween-lofi"
                  title="Spooky Halloween Lofi"
                  target="_blank"
                  className="text-gray-400 hover:text-gray-300"
                >
                  Spooky Halloween Lofi
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
