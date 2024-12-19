import React, { useEffect, useRef } from 'react';
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

const AudioVisualizer = ({ audioContext, audioSource, settings }: AudioVisualizerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    if (!containerRef.current || !audioContext || !audioSource) return;

    console.log("Initializing visualizer with settings:", settings);

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

    // Create visualization based on type
    let visualizer: VisualizerComponent;
    
    switch (settings.barType) {
      case 'circular':
        visualizer = CircularVisualizer({ analyser, settings, dataArray });
        break;
      case 'wave':
        visualizer = WaveVisualizer({ analyser, settings, dataArray });
        break;
      case 'blocks':
        visualizer = BlocksVisualizer({ analyser, settings, dataArray });
        break;
      case 'particles':
        visualizer = ParticlesVisualizer({ analyser, settings, dataArray });
        break;
      case 'particleBurst':
        visualizer = ParticleBurstVisualizer({ analyser, settings, dataArray });
        break;
      case 'ripple':
        visualizer = RippleVisualizer({ analyser, settings, dataArray });
        break;
      default:
        visualizer = DefaultVisualizer({ analyser, settings, dataArray });
    }
    
    scene.add(visualizer.mesh);
    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      visualizer.update();

      // Apply glitch effect
      if (settings.glitchAmount > 0) {
        const glitchScale = Math.random() * settings.glitchAmount * 0.1;
        visualizer.mesh.position.x = (Math.random() - 0.5) * glitchScale;
        visualizer.mesh.position.y = (Math.random() - 0.5) * glitchScale;
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
      scene.remove(visualizer.mesh);
      if (visualizer.mesh instanceof THREE.Group) {
        visualizer.mesh.children.forEach(child => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            child.material.dispose();
          }
        });
      } else if (visualizer.mesh instanceof THREE.Mesh) {
        visualizer.mesh.geometry.dispose();
        visualizer.mesh.material.dispose();
      }
      renderer.dispose();
    };
  }, [audioContext, audioSource, settings]);

  return <div ref={containerRef} className="visualizer-container" />;
};

export default AudioVisualizer;