import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { useToast } from "@/hooks/use-toast";
import DefaultVisualizer from './visualizers/DefaultVisualizer';
import CircularVisualizer from './visualizers/CircularVisualizer';
import WaveVisualizer from './visualizers/WaveVisualizer';
import BlocksVisualizer from './visualizers/BlocksVisualizer';
import ParticlesVisualizer from './visualizers/ParticlesVisualizer';
import ParticleBurstVisualizer from './visualizers/ParticleBurstVisualizer';
import RippleVisualizer from './visualizers/RippleVisualizer';
import type { VisualizerSettings, VisualizerComponent } from './visualizers/types';

interface AudioVisualizerProps {
  audioContext: AudioContext | null;
  audioSource: MediaElementAudioSourceNode | null;
  settings: VisualizerSettings;
}

const AudioVisualizer = React.memo(({ audioContext, audioSource, settings }: AudioVisualizerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const frameIdRef = useRef<number>();
  const { toast } = useToast();
  
  // Memoize scene setup
  const setupScene = useCallback(() => {
    if (!containerRef.current) return null;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Optimize for performance
    containerRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    camera.position.z = 5;

    return { scene, camera, renderer };
  }, []);

  // Memoize visualizer creation
  const createVisualizer = useCallback((
    analyser: AnalyserNode,
    settings: VisualizerSettings,
    dataArray: Uint8Array
  ): VisualizerComponent => {
    console.log("Creating visualizer with settings:", settings);
    
    switch (settings.barType) {
      case 'circular':
        return CircularVisualizer({ analyser, settings, dataArray });
      case 'wave':
        return WaveVisualizer({ analyser, settings, dataArray });
      case 'blocks':
        return BlocksVisualizer({ analyser, settings, dataArray });
      case 'particles':
        return ParticlesVisualizer({ analyser, settings, dataArray });
      case 'particleBurst':
        return ParticleBurstVisualizer({ analyser, settings, dataArray });
      case 'ripple':
        return RippleVisualizer({ analyser, settings, dataArray });
      default:
        return DefaultVisualizer({ analyser, settings, dataArray });
    }
  }, []);

  // Optimize resize handler
  const handleResize = useCallback(() => {
    if (!cameraRef.current || !rendererRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    cameraRef.current.aspect = width / height;
    cameraRef.current.updateProjectionMatrix();

    rendererRef.current.setSize(width, height);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !audioContext || !audioSource) return;

    console.log("Initializing visualizer");

    // Setup Three.js scene
    const { scene, camera, renderer } = setupScene() || {};
    if (!scene || !camera || !renderer) return;

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    // Create analyzer with optimized settings
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256; // Reduced for better performance
    analyser.smoothingTimeConstant = 0.8; // Smooth transitions
    audioSource.connect(analyser);
    
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // Create visualization
    const visualizer = createVisualizer(analyser, settings, dataArray);
    scene.add(visualizer.mesh);

    // Optimized animation loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      
      visualizer.update();

      // Apply glitch effect only when needed
      if (settings.glitchAmount > 0) {
        const glitchScale = Math.random() * settings.glitchAmount * 0.1;
        visualizer.mesh.position.x = (Math.random() - 0.5) * glitchScale;
        visualizer.mesh.position.y = (Math.random() - 0.5) * glitchScale;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Optimized event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      console.log("Cleaning up visualizer");
      
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameIdRef.current!);
      
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      if (sceneRef.current && visualizer.mesh) {
        sceneRef.current.remove(visualizer.mesh);
        
        // Properly dispose of resources
        if (visualizer.mesh instanceof THREE.Group) {
          visualizer.mesh.children.forEach(child => {
            if (child instanceof THREE.Mesh) {
              child.geometry.dispose();
              if (Array.isArray(child.material)) {
                child.material.forEach(material => material.dispose());
              } else {
                child.material.dispose();
              }
            }
          });
        } else if (visualizer.mesh instanceof THREE.Mesh) {
          visualizer.mesh.geometry.dispose();
          if (Array.isArray(visualizer.mesh.material)) {
            visualizer.mesh.material.forEach(material => material.dispose());
          } else {
            visualizer.mesh.material.dispose();
          }
        }
      }
      
      rendererRef.current?.dispose();
    };
  }, [audioContext, audioSource, settings, setupScene, createVisualizer, handleResize]);

  return <div ref={containerRef} className="visualizer-container" />;
});

AudioVisualizer.displayName = 'AudioVisualizer';

export default AudioVisualizer;