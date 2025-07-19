import React, { useState, useEffect } from "react";
import "./TeamCarousel.css"; // CSS styles will go here

const teamMembers = [
  { name: "Emily Kim", role: "Founder", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=3687&auto=format&fit=crop" },
  { name: "Michael Steward", role: "Creative Director", img: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=3870&auto=format&fit=crop" },
  { name: "Emma Rodriguez", role: "Lead Developer", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&auto=format&fit=crop&q=60" },
  { name: "Julia Gimmel", role: "UX Designer", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&auto=format&fit=crop&q=60" },
  { name: "Lisa Anderson", role: "Marketing Manager", img: "https://images.unsplash.com/photo-1655249481446-25d575f1c054?w=900&auto=format&fit=crop&q=60" },
  { name: "James Wilson", role: "Product Manager", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=3687&auto=format&fit=crop" }
];

const TeamCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const updateCarousel = (newIndex) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((newIndex + teamMembers.length) % teamMembers.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") updateCarousel(currentIndex - 1);
    else if (e.key === "ArrowRight") updateCarousel(currentIndex + 1);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  return (
    <div className="team-section">
      <h1 className="about-title">OUR TEAM</h1>

      <div className="carousel-container">
        <button className="nav-arrow left" onClick={() => updateCarousel(currentIndex - 1)}>‹</button>
        <div className="carousel-track">
          {teamMembers.map((member, i) => {
            const offset = (i - currentIndex + teamMembers.length) % teamMembers.length;
            let className = "card";
            if (offset === 0) className += " center";
            else if (offset === 1) className += " right-1";
            else if (offset === 2) className += " right-2";
            else if (offset === teamMembers.length - 1) className += " left-1";
            else if (offset === teamMembers.length - 2) className += " left-2";
            else className += " hidden";
            return (
              <div className={className} key={i} onClick={() => updateCarousel(i)}>
                <img src={member.img} alt={`Team Member ${i + 1}`} />
              </div>
            );
          })}
        </div>
        <button className="nav-arrow right" onClick={() => updateCarousel(currentIndex + 1)}>›</button>
      </div>

      <div className="member-info">
        <h2 className="member-name">{teamMembers[currentIndex].name}</h2>
        <p className="member-role">{teamMembers[currentIndex].role}</p>
      </div>

      <div className="dots">
        {teamMembers.map((_, i) => (
          <div
            key={i}
            className={`dot ${i === currentIndex ? "active" : ""}`}
            onClick={() => updateCarousel(i)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default TeamCarousel; 