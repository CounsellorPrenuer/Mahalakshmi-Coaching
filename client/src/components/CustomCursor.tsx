import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CursorPosition {
  x: number;
  y: number;
}

export function CustomCursor() {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [trail, setTrail] = useState<CursorPosition[]>([]);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        "ontouchstart" in window || navigator.maxTouchPoints > 0
      );
    };
    checkTouch();
  }, []);

  const updatePosition = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
    setIsVisible(true);
    setTrail((prev) => {
      const newTrail = [{ x: e.clientX, y: e.clientY }, ...prev.slice(0, 5)];
      return newTrail;
    });
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => setIsHovering(false), []);

  useEffect(() => {
    if (isTouchDevice) return;

    window.addEventListener("mousemove", updatePosition);
    document.addEventListener("mouseleave", () => setIsVisible(false));
    document.addEventListener("mouseenter", () => setIsVisible(true));

    const interactiveElements = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, select, [data-cursor-hover]"
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [isTouchDevice, updatePosition, handleMouseEnter, handleMouseLeave]);

  useEffect(() => {
    if (isTouchDevice) return;
    document.body.style.cursor = "none";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {trail.map((pos, index) => (
            <motion.div
              key={index}
              className="pointer-events-none fixed z-[9998] rounded-full bg-gradient-to-r from-primary/30 to-purple-500/30"
              style={{
                left: pos.x,
                top: pos.y,
                width: 12 - index * 1.5,
                height: 12 - index * 1.5,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 0.3 - index * 0.05 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
            />
          ))}
          <motion.div
            className="pointer-events-none fixed z-[9999] rounded-full"
            style={{
              left: position.x,
              top: position.y,
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              width: isHovering ? 40 : 24,
              height: isHovering ? 40 : 24,
              background: isHovering
                ? "linear-gradient(135deg, hsl(262, 83%, 58%) 0%, hsl(280, 75%, 52%) 100%)"
                : "linear-gradient(135deg, hsl(262, 83%, 58%) 0%, hsl(220, 85%, 48%) 100%)",
              boxShadow: isHovering
                ? "0 0 30px rgba(124, 58, 237, 0.6)"
                : "0 0 15px rgba(124, 58, 237, 0.4)",
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 28,
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
}
