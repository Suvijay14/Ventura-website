'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { animatePosition } from '@/lib/three-scene';

interface SceneRef {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;
  layers: {
    code: THREE.Group;
    compliance: THREE.Group;
    consulting: THREE.Group;
  };
}

function createCodeLayer(): THREE.Group {
  const group = new THREE.Group();

  const geometry = new THREE.BoxGeometry(6, 0.3, 6);
  const material = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.3,
    roughness: 0.4,
  });
  const platform = new THREE.Mesh(geometry, material);
  platform.position.y = 0;
  platform.castShadow = true;
  platform.receiveShadow = true;
  group.add(platform);

  const blockGeometry = new THREE.BoxGeometry(0.8, 0.4, 0.8);
  const blockMaterial = new THREE.MeshStandardMaterial({
    color: 0x334155,
    metalness: 0.2,
    roughness: 0.6,
  });

  for (let i = 0; i < 9; i++) {
    const block = new THREE.Mesh(blockGeometry, blockMaterial);
    const row = Math.floor(i / 3);
    const col = i % 3;
    block.position.set((col - 1) * 1.5, 0.35, (row - 1) * 1.5);
    block.castShadow = true;
    group.add(block);
  }

  group.position.y = 0;
  return group;
}

function createComplianceLayer(): THREE.Group {
  const group = new THREE.Group();

  const geometry = new THREE.BoxGeometry(5, 0.3, 5);
  const material = new THREE.MeshStandardMaterial({
    color: 0x1e40af,
    metalness: 0.4,
    roughness: 0.3,
  });
  const platform = new THREE.Mesh(geometry, material);
  platform.position.y = 0;
  platform.castShadow = true;
  group.add(platform);

  const shieldGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.6, 6);
  const shieldMaterial = new THREE.MeshStandardMaterial({
    color: 0x2563eb,
    metalness: 0.5,
    roughness: 0.3,
  });

  for (let i = 0; i < 8; i++) {
    const shield = new THREE.Mesh(shieldGeometry, shieldMaterial);
    const angle = (i / 8) * Math.PI * 2;
    const radius = 1.5;
    shield.position.set(
      Math.cos(angle) * radius,
      0.45,
      Math.sin(angle) * radius
    );
    shield.castShadow = true;
    group.add(shield);
  }

  group.position.y = 2;
  return group;
}

function createConsultingLayer(): THREE.Group {
  const group = new THREE.Group();

  const geometry = new THREE.BoxGeometry(4, 0.3, 4);
  const material = new THREE.MeshStandardMaterial({
    color: 0x059669,
    metalness: 0.6,
    roughness: 0.2,
  });
  const platform = new THREE.Mesh(geometry, material);
  platform.position.y = 0;
  platform.castShadow = true;
  group.add(platform);

  const gemGeometry = new THREE.OctahedronGeometry(0.4, 0);
  const gemMaterial = new THREE.MeshStandardMaterial({
    color: 0x10b981,
    metalness: 0.7,
    roughness: 0.2,
    emissive: 0x059669,
    emissiveIntensity: 0.2,
  });

  for (let i = 0; i < 4; i++) {
    const gem = new THREE.Mesh(gemGeometry, gemMaterial);
    const row = Math.floor(i / 2);
    const col = i % 2;
    gem.position.set(
      (col - 0.5) * 1.2,
      0.5,
      (row - 0.5) * 1.2
    );
    gem.castShadow = true;
    group.add(gem);
  }

  group.position.y = 4;
  return group;
}

export default function ComplianceVisualization() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSeparated, setIsSeparated] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const isSeparatedRef = useRef(false);
  const sceneRef = useRef<SceneRef | null>(null);
  const animationFrameRef = useRef<number>(0);

  isSeparatedRef.current = isSeparated;

  const separateLayers = useCallback(async () => {
    if (!sceneRef.current || isAnimating) return;

    const { layers } = sceneRef.current;
    setIsAnimating(true);
    setIsSeparated(true);

    await Promise.all([
      animatePosition(layers.code, { y: -2, x: -4, z: 0 }, 1200),
      animatePosition(layers.compliance, { y: 2, x: 4, z: 0 }, 1200),
      animatePosition(layers.consulting, { y: 6, x: 0, z: 0 }, 1200),
    ]);

    setIsAnimating(false);
  }, [isAnimating]);

  const assembleLayers = useCallback(async () => {
    if (!sceneRef.current || isAnimating) return;

    const { layers } = sceneRef.current;
    setIsAnimating(true);
    setIsSeparated(false);

    await Promise.all([
      animatePosition(layers.code, { y: 0, x: 0, z: 0 }, 1200),
      animatePosition(layers.compliance, { y: 2, x: 0, z: 0 }, 1200),
      animatePosition(layers.consulting, { y: 4, x: 0, z: 0 }, 1200),
    ]);

    setIsAnimating(false);
  }, [isAnimating]);

  const resetView = useCallback(() => {
    if (!sceneRef.current) return;

    const { camera, controls } = sceneRef.current;
    camera.position.set(0, 5, 15);
    controls.target.set(0, 2, 0);
    controls.update();
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);

    const camera = new THREE.PerspectiveCamera(
      50,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 15);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    containerRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 8;
    controls.maxDistance = 30;
    controls.target.set(0, 2, 0);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -20;
    directionalLight.shadow.camera.right = 20;
    directionalLight.shadow.camera.top = 20;
    directionalLight.shadow.camera.bottom = -20;
    scene.add(directionalLight);

    const layers = {
      code: createCodeLayer(),
      compliance: createComplianceLayer(),
      consulting: createConsultingLayer(),
    };

    scene.add(layers.code);
    scene.add(layers.compliance);
    scene.add(layers.consulting);

    sceneRef.current = {
      scene,
      camera,
      renderer,
      controls,
      layers,
    };

    function animate() {
      animationFrameRef.current = requestAnimationFrame(animate);
      controls.update();

      if (!isSeparatedRef.current && sceneRef.current) {
        const { layers } = sceneRef.current;
        layers.code.rotation.y += 0.001;
        layers.compliance.rotation.y += 0.001;
        layers.consulting.rotation.y += 0.001;
      }

      renderer.render(scene, camera);
    }
    animate();

    setIsLoaded(true);

    function handleResize() {
      if (!containerRef.current || !sceneRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      sceneRef.current.camera.aspect = width / height;
      sceneRef.current.camera.updateProjectionMatrix();
      sceneRef.current.renderer.setSize(width, height);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
      sceneRef.current = null;
    };
  }, []);

  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-[#f8fafc]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-[#0f172a] mb-4">
            How Ventura Works
          </h2>
          <p className="text-lg text-[#475569] max-w-2xl mx-auto">
            Our platform connects source code analysis with EU AI Act compliance
            requirements and expert consulting guidance in a unified workflow.
          </p>
        </div>

        <div className="relative">
          <div
            ref={containerRef}
            className="w-full h-[600px] bg-white rounded-lg shadow-xl border border-[#e2e8f0] overflow-hidden"
          />

          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 rounded-lg">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e40af] mx-auto mb-4" />
                <p className="text-[#64748b]">Loading visualization...</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center gap-4 mt-8 flex-wrap">
          <button
            onClick={isSeparated ? assembleLayers : separateLayers}
            disabled={isAnimating}
            className="px-8 py-3 border-2 border-[#0f172a] text-[#0f172a] rounded hover:bg-[#0f172a] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnimating
              ? 'Animating...'
              : isSeparated
                ? 'Reassemble Layers'
                : 'Separate Layers'}
          </button>

          <button
            onClick={resetView}
            className="px-8 py-3 border border-[#e2e8f0] text-[#475569] rounded hover:border-[#0f172a] hover:text-[#0f172a] transition-colors"
          >
            Reset View
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="text-center p-6 bg-white rounded-lg border border-[#e2e8f0]">
            <div className="w-12 h-12 bg-[#1e293b] rounded mx-auto mb-3" />
            <h3 className="font-semibold text-[#0f172a] mb-2">Code Layer</h3>
            <p className="text-sm text-[#64748b]">
              Your source code analyzed at the AST level for compliance
              patterns
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg border border-[#e2e8f0]">
            <div className="w-12 h-12 bg-[#1e40af] rounded mx-auto mb-3" />
            <h3 className="font-semibold text-[#0f172a] mb-2">
              Compliance Layer
            </h3>
            <p className="text-sm text-[#64748b]">
              EU AI Act articles and requirements mapped to your code
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg border border-[#e2e8f0]">
            <div className="w-12 h-12 bg-[#059669] rounded mx-auto mb-3" />
            <h3 className="font-semibold text-[#0f172a] mb-2">
              Consulting Layer
            </h3>
            <p className="text-sm text-[#64748b]">
              Expert guidance and recommended fixes for violations
            </p>
          </div>
        </div>

        <div className="text-center mt-8 text-sm text-[#64748b]">
          <p>
            💡 Click and drag to rotate • Scroll to zoom • Click &quot;Separate
            Layers&quot; to explode view
          </p>
        </div>
      </div>
    </section>
  );
}
