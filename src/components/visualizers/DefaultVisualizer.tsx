import * as THREE from 'three';
import { useMemo } from 'react';
import type { VisualizerProps, VisualizerComponent } from './types';

const DefaultVisualizer = ({ analyser, settings, dataArray }: VisualizerProps): VisualizerComponent => {
  console.log("Initializing Default visualizer with settings:", settings);

  const { geometry, material, visualizer } = useMemo(() => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
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
    const bassValue = (dataArray[0] / 255) * settings.intensity;
    visualizer.scale.set(
      1 + bassValue * 0.5,
      1 + bassValue * 0.5,
      1 + bassValue * 0.5
    );
    visualizer.rotation.x += 0.01 * settings.speed;
    visualizer.rotation.y += 0.01 * settings.speed;
  };

  return { mesh: visualizer, update };
};

export default DefaultVisualizer;