"use client";
import { useState } from "react";
export const Ghost = () => {
    const [isHovered, setIsHovered] = useState(false);
    return (
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
    )
}