"use client";

import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import './LikeButton.css';

const LikeButton = () => {
  const [isLiked, setIsLiked] = useState(false);

  // On initial render, check localStorage for the liked state
  useEffect(() => {
    const likedState = localStorage.getItem('portfolio-liked');
    if (likedState === 'true') {
      setIsLiked(true);
    }
  }, []);

  const handleLikeToggle = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    localStorage.setItem('portfolio-liked', String(newLikedState));
  };

  return (
    <button
      onClick={handleLikeToggle}
      className={`like-button ${isLiked ? 'liked' : ''}`}
      aria-pressed={isLiked}
    >
      <Heart className="like-icon" fill={isLiked ? 'currentColor' : 'none'} />
      <span className="like-text">{isLiked ? 'Unlike' : 'Like this site'}</span>
    </button>
  );
};

export default LikeButton;