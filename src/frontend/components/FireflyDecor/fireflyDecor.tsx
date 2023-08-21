"use client";

import { useRef, useState, useEffect } from "react";

import "./index.css";

const renderFirefly = (screenWidth: number) => {
  const left = Math.floor(Math.random() * screenWidth);
  const offset = getOffset(screenWidth, left);
  const correctedLeft = left + offset;

  return (
    <div
      className="nest__firefly"
      style={{
        left: `${correctedLeft}px`,
        animationDelay: `${Math.floor(Math.random() * 19)}s`,
      }}
    />
  );
};

const getOffset = (screenWidth: number, left: number) => {
  const fireflyAnimationWidth = 65;

  if (left + fireflyAnimationWidth > screenWidth) {
    return -fireflyAnimationWidth;
  } else if (left - fireflyAnimationWidth < screenWidth) {
    return fireflyAnimationWidth;
  }

  return 0;
};

export default function FireflyDecor() {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);

  const getWidth = () => {
    if (!ref.current) return;

    const width = ref.current.clientWidth;
    setWidth(width);
  };

  useEffect(() => {
    if (ref.current) {
      getWidth();
      window.addEventListener("resize", getWidth);
    }

    return () => window.removeEventListener("resize", getWidth);
  });

  return (
    /* TODO (Coul Greer): Optimize the generation of fireflies. There should be a more
      programatic way to produce the desired number of fireflies with a change of a
      value instead of copy and pasting the same method call. */
    <div ref={ref} className="nest">
      {renderFirefly(width)}
      {renderFirefly(width)}
      {renderFirefly(width)}
      {renderFirefly(width)}
      {renderFirefly(width)}
      {renderFirefly(width)}
      {renderFirefly(width)}
      {renderFirefly(width)}
      {renderFirefly(width)}
    </div>
  );
}
