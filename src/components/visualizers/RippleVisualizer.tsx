import * as THREE from 'three';
import { useMemo } from 'react';
import type { VisualizerProps, VisualizerComponent } from './types';

const RippleVisualizer = ({ analyser, settings, dataArray }: VisualizerProps): VisualizerComponent => {
  console.log("Initializing Ripple visualizer with settings:", settings);

  const { geometry, material, rippleMesh } = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(4, 4, 64, 64);
    const material = new THREE.MeshPhongMaterial({
      color: 0x9b87f5,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide
    });
    const rippleMesh = new THREE.Mesh(geometry, material);
    rippleMesh.rotation.x = -Math.PI / 2;
    
    return { geometry, material, rippleMesh };
  }, []);

  let phase = 0;
  let zoomPhase = 0;

  const update = () => {
    analyser.getByteFrequencyData(dataArray);
    const bassValue = (dataArray[0] / 255) * settings.intensity;
    phase += 0.03 * settings.speed;
    zoomPhase += 0.01 * settings.zoomSpeed;

    const positions = geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const z = positions[i + 2];
      const distance = Math.sqrt(x * x + z * z);
      
      // Add zoom effect to the wave height
      const zoomEffect = Math.sin(zoomPhase) * settings.zoomIntensity;
      positions[i + 1] = Math.sin(distance * 2 - phase) * 
                        (0.2 + bassValue * 0.3 + zoomEffect) * 
                        Math.exp(-distance * 0.5);
    }

    geometry.attributes.position.needsUpdate = true;
    rippleMesh.rotation.z += 0.005 * settings.speed;

    // Apply glitch effect
    if (settings.glitchAmount > 0) {
      const glitchScale = Math.random() * settings.glitchAmount * 0.1;
      rippleMesh.position.x += (Math.random() - 0.5) * glitchScale;
      rippleMesh.position.y += (Math.random() - 0.5) * glitchScale;
    }

    // Apply zoom scaling
    const zoomScale = 1 + Math.sin(zoomPhase) * settings.zoomIntensity * 0.2;
    rippleMesh.scale.set(zoomScale, zoomScale, zoomScale);
  };

  return { 
    mesh: rippleMesh, 
    update,
    cleanup: () => {
      console.log("Cleaning up Ripple visualizer");
      geometry.dispose();
      material.dispose();
    }
  };
};

export default RippleVisualizer;