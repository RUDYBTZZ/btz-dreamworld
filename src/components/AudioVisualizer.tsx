import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useToast } from "@/hooks/use-toast";

interface VisualizerSettings {
  intensity: number;
  speed: number;
  glitchAmount: number;
  barType: string;
}

interface AudioVisualizerProps {
  audioContext: AudioContext | null;
  audioSource: MediaElementAudioSourceNode | null;
  settings: VisualizerSettings;
}

const AudioVisualizer = ({ audioContext, audioSource, settings }: AudioVisualizerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    if (!containerRef.current || !audioContext || !audioSource) return;

    // Setup Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create analyzer
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    audioSource.connect(analyser);
    
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // Create visualization elements
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ 
      color: 0x9b87f5,
      specular: 0x9b87f5,
      shininess: 100,
    });
    
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      analyser.getByteFrequencyData(dataArray);
      
      // Calculate average frequency and apply intensity setting
      const average = (dataArray.reduce((a, b) => a + b) / bufferLength) * settings.intensity;
      
      // Apply speed setting to rotation
      const rotationSpeed = 0.01 * settings.speed;
      
      // Respond to bass frequencies with intensity setting
      const bassValue = (dataArray[0] / 255) * settings.intensity;
      cube.scale.set(
        1 + bassValue * 0.5,
        1 + bassValue * 0.5,
        1 + bassValue * 0.5
      );
      
      cube.rotation.x += rotationSpeed;
      cube.rotation.y += rotationSpeed;

      // Apply glitch effect
      if (settings.glitchAmount > 0) {
        const glitchScale = Math.random() * settings.glitchAmount * 0.1;
        cube.position.x = (Math.random() - 0.5) * glitchScale;
        cube.position.y = (Math.random() - 0.5) * glitchScale;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      scene.remove(cube);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [audioContext, audioSource, settings]);

  return <div ref={containerRef} className="visualizer-container" />;
};

export default AudioVisualizer;