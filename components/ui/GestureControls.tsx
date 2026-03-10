'use client';

import { useCallback, useRef, useState } from 'react';

export type GestureType = 'separate' | 'assemble' | 'rotate-left' | 'rotate-right';

interface GestureControlsProps {
  onGesture: (gesture: GestureType) => void;
  className?: string;
}

/**
 * Touch and mouse gesture overlay for 3D visualization.
 * Detects swipe gestures to trigger separate/assemble and rotate.
 * For full hand tracking, install @mediapipe/hands and @mediapipe/camera_utils.
 */
export default function GestureControls({ onGesture, className }: GestureControlsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    },
    []
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStartRef.current) return;

      const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
      const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;

      const threshold = 80;
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > threshold) {
          onGesture('rotate-right');
        } else if (deltaX < -threshold) {
          onGesture('rotate-left');
        }
      } else {
        if (deltaY < -threshold) {
          onGesture('separate');
        } else if (deltaY > threshold) {
          onGesture('assemble');
        }
      }

      touchStartRef.current = null;
    },
    [onGesture]
  );

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    touchStartRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseUp = useCallback(
    (e: React.MouseEvent) => {
      if (!touchStartRef.current) return;

      const deltaX = e.clientX - touchStartRef.current.x;
      const deltaY = e.clientY - touchStartRef.current.y;

      const threshold = 80;
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > threshold) {
          onGesture('rotate-right');
        } else if (deltaX < -threshold) {
          onGesture('rotate-left');
        }
      } else {
        if (deltaY < -threshold) {
          onGesture('separate');
        } else if (deltaY > threshold) {
          onGesture('assemble');
        }
      }

      touchStartRef.current = null;
    },
    [onGesture]
  );

  return (
    <div
      className={className}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-xs text-[#64748b] bg-white/90 hover:bg-white border border-[#e2e8f0] px-2 py-1 rounded shadow-sm transition-colors"
        aria-label="Toggle gesture hint"
      >
        {isExpanded ? 'Hide hint' : 'Gesture hint'}
      </button>
      {isExpanded && (
        <div className="mt-2 text-[11px] text-[#64748b] space-y-1">
          <p>Swipe up: separate layers</p>
          <p>Swipe down: reassemble</p>
          <p>Swipe left/right: rotate</p>
        </div>
      )}
    </div>
  );
}
