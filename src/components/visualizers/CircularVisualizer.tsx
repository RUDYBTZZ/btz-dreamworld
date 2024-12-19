import * as THREE from 'three';
import React, { useMemo } from 'react';
import { VisualizerProps } from './types';

const CircularVisualizer = React.memo(({ analyser, settings, dataArray }: VisualizerProps) => {
  console.log("Initializing Circular visualizer with settings:", settings);

  const { geometry, material, visualizer } = useMemo(() => {
    const geometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
    const material = new THREE.MeshPhongMaterial({ 
      color: 0x9b87f5,
      specular: 0x9b87f5,
      shininess: 100,
    });
    const visualizer = new THREE.Mesh(geometry, material);
    return { geometry, material, visualizer };
  }, []);

  const update = () => {
    analyser.getByteFrequencyData(dataArray);
    const average = (dataArray.reduce((a, b) => a + b) / dataArray.length) * settings.intensity;
    visualizer.scale.set(1 + average * 0.003, 1 + average * 0.003, 1);
    visualizer.rotation.z += 0.01 * settings.speed;
  };

  return { mesh: visualizer, update };
});

CircularVisualizer.displayName = 'CircularVisualizer';

export default CircularVisualizer;