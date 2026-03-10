'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface SceneRef {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;
  building: {
    contracts: THREE.Group;
    consulting: THREE.Group;
    compliance: THREE.Group;
    logo: THREE.Group;
  };
}

// Ease-in-out cubic
function easeInOutCubic(t: number): number {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function animateTransform(
  object: THREE.Group,
  target: {
    position?: { x?: number; y?: number; z?: number };
    rotation?: { x?: number; y?: number; z?: number };
  },
  duration: number
) {
  const startPos = { x: object.position.x, y: object.position.y, z: object.position.z };
  const startRot = { x: object.rotation.x, y: object.rotation.y, z: object.rotation.z };
  const startTime = Date.now();

  function animate() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);

    if (target.position) {
      if (target.position.x !== undefined) {
        object.position.x = startPos.x + (target.position.x - startPos.x) * eased;
      }
      if (target.position.y !== undefined) {
        object.position.y = startPos.y + (target.position.y - startPos.y) * eased;
      }
      if (target.position.z !== undefined) {
        object.position.z = startPos.z + (target.position.z - startPos.z) * eased;
      }
    }

    if (target.rotation && target.rotation.y !== undefined) {
      object.rotation.y = startRot.y + (target.rotation.y - startRot.y) * eased;
    }

    if (progress < 1) requestAnimationFrame(animate);
  }

  animate();
}

function addFloatingLabel(
  parent: THREE.Group,
  text: string,
  x: number,
  y: number,
  z: number,
  color: number
) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return;

  canvas.width = 1024;
  canvas.height = 256;

  context.fillStyle = `#${color.toString(16).padStart(6, '0')}`;
  context.font = 'bold 80px system-ui, -apple-system, sans-serif';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(text, 512, 128);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const spriteMaterial = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    opacity: 0.95,
  });
  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.position.set(x, y, z);
  sprite.scale.set(8, 2, 1);
  parent.add(sprite);
}

function createVShape(): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();
  // V shape as triangle (left top -> bottom point -> right top)
  shape.moveTo(-1.2, 1.8);
  shape.lineTo(0, -1.5);
  shape.lineTo(1.2, 1.8);
  shape.closePath();

  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
    depth: 0.5,
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.1,
    bevelSegments: 3,
  };

  return new THREE.ExtrudeGeometry(shape, extrudeSettings);
}

function createCorporateBuilding() {
  // CONTRACTS LAYER (Ground Floor + Foundation)
  const contracts = new THREE.Group();

  const foundationGeometry = new THREE.BoxGeometry(10, 1.5, 10);
  const foundationMaterial = new THREE.MeshStandardMaterial({
    color: 0x334155,
    roughness: 0.7,
    metalness: 0.3,
  });
  const foundation = new THREE.Mesh(foundationGeometry, foundationMaterial);
  foundation.position.y = 0.75;
  foundation.castShadow = true;
  foundation.receiveShadow = true;
  contracts.add(foundation);

  const groundFloorGeometry = new THREE.BoxGeometry(8, 2, 8);
  const groundFloorMaterial = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.2,
    metalness: 0.8,
    transparent: true,
    opacity: 0.9,
  });
  const groundFloor = new THREE.Mesh(groundFloorGeometry, groundFloorMaterial);
  groundFloor.position.y = 2.5;
  groundFloor.castShadow = true;
  contracts.add(groundFloor);

  for (let i = 0; i < 4; i++) {
    const docGeometry = new THREE.BoxGeometry(0.8, 0.05, 1.2);
    const docMaterial = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      emissive: 0x1e293b,
      emissiveIntensity: 0.2,
    });
    const doc = new THREE.Mesh(docGeometry, docMaterial);
    const angle = (i / 4) * Math.PI * 2;
    doc.position.set(Math.cos(angle) * 3, 1.5, Math.sin(angle) * 3);
    doc.rotation.y = -angle;
    contracts.add(doc);
  }

  addFloatingLabel(contracts, 'CONTRACTS', 0, -1, 0, 0x1e293b);
  contracts.position.y = 0;

  // CONSULTING LAYER (Middle Floors)
  const consulting = new THREE.Group();

  const middleGeometry = new THREE.BoxGeometry(7, 3.5, 7);
  const middleMaterial = new THREE.MeshStandardMaterial({
    color: 0x2563eb,
    roughness: 0.1,
    metalness: 0.9,
    transparent: true,
    opacity: 0.85,
    emissive: 0x1e40af,
    emissiveIntensity: 0.1,
  });
  const middle = new THREE.Mesh(middleGeometry, middleMaterial);
  middle.position.y = 0;
  middle.castShadow = true;
  consulting.add(middle);

  const nodeGeometry = new THREE.SphereGeometry(0.3, 16, 16);
  const nodeMaterial = new THREE.MeshStandardMaterial({
    color: 0x60a5fa,
    emissive: 0x3b82f6,
    emissiveIntensity: 0.3,
    metalness: 0.8,
    roughness: 0.2,
  });

  for (let i = 0; i < 6; i++) {
    const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
    const angle = (i / 6) * Math.PI * 2;
    node.position.set(Math.cos(angle) * 2.5, 0, Math.sin(angle) * 2.5);
    consulting.add(node);
  }

  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 6; x++) {
      const windowGeometry = new THREE.PlaneGeometry(0.8, 0.8);
      const windowMaterial = new THREE.MeshStandardMaterial({
        color: 0x93c5fd,
        emissive: 0x60a5fa,
        emissiveIntensity: 0.2,
        transparent: true,
        opacity: 0.7,
      });
      const windowPane = new THREE.Mesh(windowGeometry, windowMaterial);
      windowPane.position.set((x - 2.5) * 1.1, (y - 1) * 1.1, 3.51);
      consulting.add(windowPane);
    }
  }

  addFloatingLabel(consulting, 'CONSULTING', 0, -2.5, 0, 0x2563eb);
  consulting.position.y = 4;

  // COMPLIANCE LAYER (Top Floor + Roof)
  const compliance = new THREE.Group();

  const topGeometry = new THREE.BoxGeometry(6, 3, 6);
  const topMaterial = new THREE.MeshStandardMaterial({
    color: 0x10b981,
    roughness: 0.2,
    metalness: 0.8,
    transparent: true,
    opacity: 0.9,
    emissive: 0x059669,
    emissiveIntensity: 0.15,
  });
  const top = new THREE.Mesh(topGeometry, topMaterial);
  top.position.y = 0;
  top.castShadow = true;
  compliance.add(top);

  const shieldGeometry = new THREE.CylinderGeometry(0.4, 0.5, 0.8, 6);
  const shieldMaterial = new THREE.MeshStandardMaterial({
    color: 0x34d399,
    emissive: 0x10b981,
    emissiveIntensity: 0.2,
    metalness: 0.7,
    roughness: 0.3,
  });

  for (let i = 0; i < 8; i++) {
    const shield = new THREE.Mesh(shieldGeometry, shieldMaterial);
    const angle = (i / 8) * Math.PI * 2;
    shield.position.set(
      Math.cos(angle) * 2.5,
      0,
      Math.sin(angle) * 2.5
    );
    compliance.add(shield);
  }

  const roofGeometry = new THREE.ConeGeometry(4, 2, 4);
  const roofMaterial = new THREE.MeshStandardMaterial({
    color: 0x059669,
    metalness: 0.6,
    roughness: 0.3,
  });
  const roof = new THREE.Mesh(roofGeometry, roofMaterial);
  roof.position.y = 2.5;
  roof.rotation.y = Math.PI / 4;
  roof.castShadow = true;
  compliance.add(roof);

  addFloatingLabel(compliance, 'COMPLIANCE', 0, -2.5, 0, 0x10b981);
  compliance.position.y = 8;

  // COMPANY LOGO (V for Ventura)
  const logo = new THREE.Group();

  try {
    const vGeometry = createVShape();
    const vMaterial = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.3,
    });
    const vLogo = new THREE.Mesh(vGeometry, vMaterial);
    vLogo.rotation.x = Math.PI / 2;
    vLogo.castShadow = true;
    logo.add(vLogo);
  } catch {
    // Fallback: two boxes in V formation
    const legMaterial = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.3,
    });
    const leftLeg = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 2.5, 0.5),
      legMaterial
    );
    leftLeg.rotation.z = Math.PI / 6;
    leftLeg.position.set(-0.6, 0.5, 0);
    leftLeg.castShadow = true;
    const rightLeg = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 2.5, 0.5),
      legMaterial
    );
    rightLeg.rotation.z = -Math.PI / 6;
    rightLeg.position.set(0.6, 0.5, 0);
    rightLeg.castShadow = true;
    logo.add(leftLeg);
    logo.add(rightLeg);
  }

  const ringGeometry = new THREE.TorusGeometry(2, 0.1, 16, 32);
  const ringMaterial = new THREE.MeshStandardMaterial({
    color: 0xfbbf24,
    emissive: 0xfbbf24,
    emissiveIntensity: 0.5,
    transparent: true,
    opacity: 0.6,
  });
  const ring = new THREE.Mesh(ringGeometry, ringMaterial);
  ring.rotation.x = Math.PI / 2;
  logo.add(ring);

  logo.position.y = 12.5;

  return { contracts, consulting, compliance, logo };
}

export default function CompanyBreakdownVisualization() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSeparated, setIsSeparated] = useState(false);
  const isSeparatedRef = useRef(false);
  const sceneRef = useRef<SceneRef | null>(null);
  const animationFrameRef = useRef<number>(0);

  isSeparatedRef.current = isSeparated;

  const separateBuilding = useCallback(() => {
    if (!sceneRef.current) return;
    setIsSeparated(true);

    const { building } = sceneRef.current;

    animateTransform(building.contracts, {
      position: { y: -4, x: -8, z: 2 },
      rotation: { y: Math.PI * 0.2 },
    }, 2000);

    animateTransform(building.consulting, {
      position: { y: 4, x: 8, z: -2 },
      rotation: { y: -Math.PI * 0.2 },
    }, 2000);

    animateTransform(building.compliance, {
      position: { y: 14, x: 0, z: 0 },
      rotation: { y: Math.PI * 0.1 },
    }, 2000);

    animateTransform(building.logo, {
      position: { y: 18, x: 0, z: 0 },
    }, 2000);
  }, []);

  const assembleBuilding = useCallback(() => {
    if (!sceneRef.current) return;
    setIsSeparated(false);

    const { building } = sceneRef.current;

    animateTransform(building.contracts, {
      position: { y: 0, x: 0, z: 0 },
      rotation: { y: 0 },
    }, 2000);

    animateTransform(building.consulting, {
      position: { y: 4, x: 0, z: 0 },
      rotation: { y: 0 },
    }, 2000);

    animateTransform(building.compliance, {
      position: { y: 8, x: 0, z: 0 },
      rotation: { y: 0 },
    }, 2000);

    animateTransform(building.logo, {
      position: { y: 12.5, x: 0, z: 0 },
    }, 2000);
  }, []);

  const resetView = useCallback(() => {
    if (!sceneRef.current) return;

    const { camera, controls } = sceneRef.current;
    camera.position.set(20, 12, 20);
    controls.target.set(0, 6, 0);
    controls.update();
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f9fa);
    scene.fog = new THREE.Fog(0xf8f9fa, 30, 60);

    const camera = new THREE.PerspectiveCamera(
      35,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(20, 12, 20);
    camera.lookAt(0, 6, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
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
    controls.minDistance = 15;
    controls.maxDistance = 40;
    controls.maxPolarAngle = Math.PI / 2;
    controls.enablePan = false;
    controls.target.set(0, 6, 0);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 1.2);
    sunLight.position.set(15, 20, 15);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 50;
    sunLight.shadow.camera.left = -20;
    sunLight.shadow.camera.right = 20;
    sunLight.shadow.camera.top = 20;
    sunLight.shadow.camera.bottom = -20;
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0xadd8e6, 0.4);
    fillLight.position.set(-10, 10, -10);
    scene.add(fillLight);

    const groundGeometry = new THREE.CircleGeometry(50, 64);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0xe5e7eb,
      roughness: 0.9,
      metalness: 0.1,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const building = createCorporateBuilding();

    scene.add(building.contracts);
    scene.add(building.consulting);
    scene.add(building.compliance);
    scene.add(building.logo);

    sceneRef.current = {
      scene,
      camera,
      renderer,
      controls,
      building,
    };

    setTimeout(() => {
      separateBuilding();
    }, 1500);

    function animate() {
      animationFrameRef.current = requestAnimationFrame(animate);
      controls.update();

      if (!isSeparatedRef.current && sceneRef.current) {
        const breathe = Math.sin(Date.now() * 0.001) * 0.02;
        const { building: b } = sceneRef.current;
        b.contracts.position.y = breathe;
        b.consulting.position.y = 4 + breathe;
        b.compliance.position.y = 8 + breathe;
        b.logo.position.y = 12.5 + breathe;
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
  }, [separateBuilding]);

  return (
    <section className="relative bg-gradient-to-b from-white via-[#f8fafc] to-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center pt-24 pb-8">
          <div className="inline-block px-4 py-2 bg-[#eff6ff] text-[#1e40af] text-sm font-medium rounded-full mb-6">
            Interactive 3D Visualization
          </div>
          <h1 className="text-5xl md:text-7xl font-light text-[#0f172a] mb-6 tracking-tight">
            Your Company,
            <br />
            <span className="text-[#2563eb]">Deconstructed</span>
          </h1>
          <p className="text-xl text-[#64748b] max-w-2xl mx-auto font-light leading-relaxed">
            See how Ventura breaks down your organization into three compliance
            layers—Contracts, Consulting, and Compliance—for complete EU AI Act
            coverage
          </p>
        </div>

        <div className="relative">
          <div
            ref={containerRef}
            className="w-full h-[600px] md:h-[700px] rounded-2xl overflow-hidden shadow-2xl bg-white"
          />

          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-white rounded-2xl">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#2563eb] mx-auto mb-4" />
                <p className="text-[#64748b] font-light">
                  Building your company visualization...
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 py-12">
          <button
            onClick={isSeparated ? assembleBuilding : separateBuilding}
            className="px-12 py-4 bg-[#0f172a] text-white rounded-lg hover:bg-[#1e293b] transition-all font-medium text-lg shadow-lg hover:shadow-xl"
          >
            {isSeparated ? (
              <>🏢 Reassemble Company</>
            ) : (
              <>💥 Break Down Layers</>
            )}
          </button>

          <button
            onClick={resetView}
            className="px-12 py-4 border-2 border-[#e2e8f0] text-[#475569] rounded-lg hover:border-[#0f172a] hover:text-[#0f172a] transition-all font-medium text-lg"
          >
            🔄 Reset View
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 pb-24">
          <div className="group bg-white p-8 rounded-xl border-2 border-[#e2e8f0] hover:border-[#0f172a] transition-all">
            <div className="w-14 h-14 bg-[#1e293b] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-[#0f172a] mb-3">
              Contracts
            </h3>
            <p className="text-[#64748b] leading-relaxed">
              The legal foundation. SLAs, vendor agreements, and data processing
              contracts analyzed for AI-specific clauses and compliance
              requirements.
            </p>
          </div>

          <div className="group bg-white p-8 rounded-xl border-2 border-[#e2e8f0] hover:border-[#2563eb] transition-all">
            <div className="w-14 h-14 bg-[#2563eb] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-[#0f172a] mb-3">
              Consulting
            </h3>
            <p className="text-[#64748b] leading-relaxed">
              Expert strategic guidance. Our network of EU AI Act specialists
              provides implementation roadmaps and best practices for your
              organization.
            </p>
          </div>

          <div className="group bg-white p-8 rounded-xl border-2 border-[#e2e8f0] hover:border-[#10b981] transition-all">
            <div className="w-14 h-14 bg-[#10b981] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-[#0f172a] mb-3">
              Compliance
            </h3>
            <p className="text-[#64748b] leading-relaxed">
              Automated verification. Real-time code analysis against all 113 EU
              AI Act articles with violation detection and suggested fixes.
            </p>
          </div>
        </div>

        <div className="text-center pb-20">
          <p className="text-[#64748b] text-sm">
            💡 Click and drag to rotate • Scroll to zoom • Use buttons to
            separate/reassemble
          </p>
        </div>
      </div>
    </section>
  );
}
