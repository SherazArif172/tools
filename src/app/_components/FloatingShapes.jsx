"use client";

import { motion } from "framer-motion";

// Function to generate random positions
const generateRandomPositions = () => {
  const positions = [];
  const usedPositions = new Set();

  // Divide the viewport into a 10x10 grid
  for (let i = 0; i < 12; i++) {
    let x, y;
    do {
      x = Math.floor(Math.random() * 100);
      y = Math.floor(Math.random() * 100);
    } while (usedPositions.has(`${Math.floor(x / 20)}-${Math.floor(y / 20)}`));

    // Mark this grid section as used
    usedPositions.add(`${Math.floor(x / 20)}-${Math.floor(y / 20)}`);
    positions.push({ x, y });
  }
  return positions;
};

const randomPositions = generateRandomPositions();

const shapes = [
  { type: "circle", size: "w-4 h-4", color: "bg-blue-400/30" },
  { type: "triangle", size: "w-16 h-16", color: "bg-sky-300/30" },
  { type: "square", size: "w-12 h-12", color: "bg-purple-300/30" },
  { type: "circle", size: "w-3 h-3", color: "bg-indigo-400/30" },
  { type: "square", size: "w-14 h-14", color: "bg-pink-300/30" },
  { type: "triangle", size: "w-10 h-10", color: "bg-violet-300/30" },
  { type: "circle", size: "w-5 h-5", color: "bg-blue-300/30" },
  { type: "square", size: "w-8 h-8", color: "bg-purple-200/30" },
  { type: "triangle", size: "w-12 h-12", color: "bg-pink-200/30" },
  { type: "circle", size: "w-6 h-6", color: "bg-indigo-200/30" },
  { type: "square", size: "w-10 h-10", color: "bg-violet-200/30" },
  { type: "triangle", size: "w-8 h-8", color: "bg-sky-200/30" },
].map((shape, index) => ({
  ...shape,
  position: randomPositions[index],
  delay: index * 0.5,
}));

export default function FloatingShapes() {
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden pointer-events-none">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className={`fixed ${shape.size} ${shape.color} ${
            shape.type === "triangle"
              ? "clip-triangle"
              : shape.type === "circle"
              ? "rounded-full"
              : "rounded-lg"
          }`}
          style={{
            left: `${shape.position.x}%`,
            top: `${shape.position.y}%`,
          }}
          animate={{
            x: [
              "0%",
              `${20 + Math.random() * 10}%`,
              `${-20 + Math.random() * -10}%`,
              "0%",
            ],
            y: [
              "0%",
              `${-25 + Math.random() * -10}%`,
              `${25 + Math.random() * 10}%`,
              "0%",
            ],
            scale: [1, 1.1, 0.9, 1],
            rotate: [0, 180, -180, 0],
          }}
          transition={{
            duration: 25 + Math.random() * 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.delay,
            times: [0, 0.33, 0.66, 1],
          }}
        />
      ))}
    </div>
  );
}
