import * as THREE from 'three';
import { VisualizerProps } from './types';

const RippleVisualizer = ({ analyser, settings, dataArray }: VisualizerProps) => {
  console.log("Initializing Ripple visualizer with settings:", settings);

  // Create ripple plane
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

  let phase = 0;

  const update = () => {
    analyser.getByteFrequencyData(dataArray);
    const bassValue = (dataArray[0] / 255) * settings.intensity;
    phase += 0.03 * settings.speed;

    const positions = geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const z = positions[i + 2];
      const distance = Math.sqrt(x * x + z * z);
      
      // Create ripple effect
      positions[i + 1] = Math.sin(distance * 2 - phase) * 
                        (0.2 + bassValue * 0.3) * 
                        Math.exp(-distance * 0.5);
    }

    geometry.attributes.position.needsUpdate = true;
    rippleMesh.rotation.z += 0.005 * settings.speed;
  };

  return { mesh: rippleMesh, update };
};

export default RippleVisualizer;