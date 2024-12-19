import * as THREE from 'three';
import type { VisualizerProps, VisualizerComponent } from './types';

const CircularVisualizer = ({ analyser, settings, dataArray }: VisualizerProps): VisualizerComponent => {
  console.log("Initializing Circular visualizer with settings:", settings);

  // Create geometry and material directly without hooks
  const geometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
  const material = new THREE.MeshPhongMaterial({ 
    color: 0x9b87f5,
    specular: 0x9b87f5,
    shininess: 100,
  });
  const visualizer = new THREE.Mesh(geometry, material);

  const update = () => {
    analyser.getByteFrequencyData(dataArray);
    const average = (dataArray.reduce((a, b) => a + b) / dataArray.length) * settings.intensity;
    visualizer.scale.set(1 + average * 0.003, 1 + average * 0.003, 1);
    visualizer.rotation.z += 0.01 * settings.speed;
  };

  const cleanup = () => {
    geometry.dispose();
    material.dispose();
  };

  return { mesh: visualizer, update, cleanup };
};

export default CircularVisualizer;