import * as THREE from 'three';

/**
 * Ease-in-out quadratic easing function
 */
export function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

/**
 * Animate an object's position to target over duration
 */
export function animatePosition(
  object: THREE.Object3D,
  target: { x?: number; y?: number; z?: number },
  duration: number,
  easingFn: (t: number) => number = easeInOutQuad
): Promise<void> {
  return new Promise((resolve) => {
    const start = {
      x: object.position.x,
      y: object.position.y,
      z: object.position.z,
    };
    const startTime = Date.now();

    function animate() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easingFn(progress);

      if (target.x !== undefined) {
        object.position.x = start.x + (target.x - start.x) * eased;
      }
      if (target.y !== undefined) {
        object.position.y = start.y + (target.y - start.y) * eased;
      }
      if (target.z !== undefined) {
        object.position.z = start.z + (target.z - start.z) * eased;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        resolve();
      }
    }

    animate();
  });
}

/**
 * Default scene background color matching Ventura design
 */
export const SCENE_BG = 0xf8fafc;
