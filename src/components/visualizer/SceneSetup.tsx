import * as THREE from 'three';

export const setupScene = (containerRef: React.RefObject<HTMLDivElement>) => {
  console.log("Setting up new Three.js scene");
  
  if (!containerRef.current) return null;

  const scene = new THREE.Scene();
  
  // Create camera without useMemo
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ 
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
    precision: 'highp'
  });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  containerRef.current.appendChild(renderer.domElement);

  // Create lights without useMemo
  const ambientLight = new THREE.AmbientLight(0x404040);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1);

  scene.add(ambientLight);
  scene.add(directionalLight);

  return { scene, camera, renderer };
};