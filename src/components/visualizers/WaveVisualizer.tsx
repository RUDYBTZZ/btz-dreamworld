import * as THREE from 'three';
import { VisualizerProps } from './types';

const WaveVisualizer = ({ analyser, settings, dataArray }: VisualizerProps) => {
  const points = [];
  for (let i = 0; i < 100; i++) {
    points.push(new THREE.Vector3(i/10 - 5, 0, 0));
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: 0x9b87f5 });
  const visualizer = new THREE.Line(geometry, material);

  const update = () => {
    analyser.getByteFrequencyData(dataArray);
    const average = (dataArray.reduce((a, b) => a + b) / dataArray.length) * settings.intensity;
    const positions = visualizer.geometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const y = Math.sin(i * 0.2 + Date.now() * 0.001 * settings.speed) * average * 0.01;
      positions.setY(i, y);
    }
    positions.needsUpdate = true;
  };

  return { mesh: visualizer, update };
};

export default WaveVisualizer;