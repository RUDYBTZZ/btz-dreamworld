import * as THREE from 'three';
import { useMemo } from 'react';

export const setupScene = (containerRef: React.RefObject<HTMLDivElement>) => {
  console.log("Setting up new Three.js scene");
  
  if (!containerRef.current) return null;

  const scene = new THREE.Scene();
  
  const camera = useMemo(() => {
    const cam = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    cam.position.z = 5;
    return cam;
  }, []);

  const renderer = new THREE.WebGLRenderer({ 
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
    precision: 'highp'
  });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  containerRef.current.appendChild(renderer.domElement);

  const lights = useMemo(() => {
    const ambientLight = new THREE.AmbientLight(0x404040);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    return { ambientLight, directionalLight };
  }, []);

  scene.add(lights.ambientLight);
  scene.add(lights.directionalLight);

  return { scene, camera, renderer };
};