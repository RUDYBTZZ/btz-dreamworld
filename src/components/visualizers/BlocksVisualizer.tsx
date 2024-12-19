import * as THREE from 'three';
import { useMemo } from 'react';
import type { VisualizerProps, VisualizerComponent } from './types';

const BlocksVisualizer = ({ analyser, settings, dataArray }: VisualizerProps): VisualizerComponent => {
  console.log("Initializing Blocks visualizer with settings:", settings);

  const blocks = useMemo(() => {
    const group = new THREE.Group();
    const blockGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const blockMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x9b87f5,
      specular: 0x9b87f5,
      shininess: 100,
    });

    for (let i = 0; i < 8; i++) {
      const block = new THREE.Mesh(blockGeometry, blockMaterial);
      block.position.x = i - 4;
      group.add(block);
    }

    return group;
  }, []);

  const update = () => {
    analyser.getByteFrequencyData(dataArray);
    blocks.children.forEach((block: THREE.Mesh, i) => {
      const frequency = dataArray[i * 4] * settings.intensity;
      block.scale.y = 1 + frequency * 0.01;
      block.rotation.x += 0.01 * settings.speed;
    });
  };

  return { mesh: blocks, update };
};

export default BlocksVisualizer;