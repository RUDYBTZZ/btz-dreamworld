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

    // Create visualization elements based on barType
    let visualizer;
    
    switch (settings.barType) {
      case 'circular':
        const circleGeometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
        const circleMaterial = new THREE.MeshPhongMaterial({ 
          color: 0x9b87f5,
          specular: 0x9b87f5,
          shininess: 100,
        });
        visualizer = new THREE.Mesh(circleGeometry, circleMaterial);
        break;
        
      case 'wave':
        const points = [];
        for (let i = 0; i < 100; i++) {
          points.push(new THREE.Vector3(i/10 - 5, 0, 0));
        }
        const waveGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const waveMaterial = new THREE.LineBasicMaterial({ color: 0x9b87f5 });
        visualizer = new THREE.Line(waveGeometry, waveMaterial);
        break;
        
      case 'blocks':
        const blocks = new THREE.Group();
        for (let i = 0; i < 8; i++) {
          const blockGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
          const blockMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x9b87f5,
            specular: 0x9b87f5,
            shininess: 100,
          });
          const block = new THREE.Mesh(blockGeometry, blockMaterial);
          block.position.x = i - 4;
          blocks.add(block);
        }
        visualizer = blocks;
        break;
        
      case 'particles':
        const particles = new THREE.Group();
        const particleGeometry = new THREE.SphereGeometry(0.1, 8, 8);
        const particleMaterial = new THREE.MeshPhongMaterial({ 
          color: 0x9b87f5,
          specular: 0x9b87f5,
          shininess: 100,
        });
        for (let i = 0; i < 50; i++) {
          const particle = new THREE.Mesh(particleGeometry, particleMaterial);
          particle.position.set(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
          );
          particles.add(particle);
        }
        visualizer = particles;
        break;
        
      default:
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshPhongMaterial({ 
          color: 0x9b87f5,
          specular: 0x9b87f5,
          shininess: 100,
        });
        visualizer = new THREE.Mesh(geometry, material);
    }
    
    scene.add(visualizer);
    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      analyser.getByteFrequencyData(dataArray);
      
      // Calculate average frequency and apply intensity setting
      const average = (dataArray.reduce((a, b) => a + b) / bufferLength) * settings.intensity;
      
      // Apply speed setting to rotation
      const rotationSpeed = 0.01 * settings.speed;

      // Apply visualization based on type
      switch (settings.barType) {
        case 'circular':
          visualizer.scale.set(1 + average * 0.003, 1 + average * 0.003, 1);
          visualizer.rotation.z += rotationSpeed;
          break;
          
        case 'wave':
          const positions = visualizer.geometry.attributes.position;
          for (let i = 0; i < positions.count; i++) {
            const y = Math.sin(i * 0.2 + Date.now() * 0.001 * settings.speed) * average * 0.01;
            positions.setY(i, y);
          }
          positions.needsUpdate = true;
          break;
          
        case 'blocks':
          visualizer.children.forEach((block, i) => {
            const frequency = dataArray[i * 4] * settings.intensity;
            block.scale.y = 1 + frequency * 0.01;
            block.rotation.x += rotationSpeed;
          });
          break;
          
        case 'particles':
          visualizer.children.forEach((particle, i) => {
            const frequency = dataArray[i % bufferLength] * settings.intensity;
            particle.position.y = Math.sin(Date.now() * 0.001 * settings.speed + i) * (1 + frequency * 0.01);
            particle.rotation.x += rotationSpeed;
          });
          break;
          
        default:
          // Respond to bass frequencies with intensity setting
          const bassValue = (dataArray[0] / 255) * settings.intensity;
          visualizer.scale.set(
            1 + bassValue * 0.5,
            1 + bassValue * 0.5,
            1 + bassValue * 0.5
          );
          visualizer.rotation.x += rotationSpeed;
          visualizer.rotation.y += rotationSpeed;
      }

      // Apply glitch effect
      if (settings.glitchAmount > 0) {
        const glitchScale = Math.random() * settings.glitchAmount * 0.1;
        visualizer.position.x = (Math.random() - 0.5) * glitchScale;
        visualizer.position.y = (Math.random() - 0.5) * glitchScale;
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
      scene.remove(visualizer);
      if (visualizer instanceof THREE.Group) {
        visualizer.children.forEach(child => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            child.material.dispose();
          }
        });
      } else if (visualizer instanceof THREE.Mesh) {
        visualizer.geometry.dispose();
        visualizer.material.dispose();
      }
      renderer.dispose();
    };
  }, [audioContext, audioSource, settings]);

  return <div ref={containerRef} className="visualizer-container" />;
};

export default AudioVisualizer;