import * as THREE from 'three';
import type { VisualizerProps, VisualizerComponent } from './types';

const PatternVisualizer = ({ analyser, settings, dataArray }: VisualizerProps): VisualizerComponent => {
  console.log("Initializing Pattern visualizer with settings:", settings);

  // Create a group to hold all the cubes
  const group = new THREE.Group();
  const cubes: THREE.Mesh[] = [];
  const gridSize = 8;
  const spacing = 0.5;

  // Create material with nice reflective properties
  const material = new THREE.MeshPhongMaterial({
    color: 0x9b87f5,
    specular: 0x9b87f5,
    shininess: 100,
    transparent: true,
    opacity: 0.8
  });

  // Create grid of cubes
  for (let x = -gridSize; x < gridSize; x++) {
    for (let z = -gridSize; z < gridSize; z++) {
      const geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(x * spacing, 0, z * spacing);
      group.add(cube);
      cubes.push(cube);
    }
  }

  // Center the group
  group.position.set(0, 0, -2);

  let time = 0;
  const update = () => {
    analyser.getByteFrequencyData(dataArray);
    
    // Get bass frequency average (first few frequencies)
    const bassValue = dataArray.slice(0, 4).reduce((a, b) => a + b, 0) / 4;
    const normalizedBass = (bassValue / 255) * settings.intensity;
    
    time += 0.01 * settings.speed;

    // Update each cube
    cubes.forEach((cube, index) => {
      const x = cube.position.x;
      const z = cube.position.z;
      
      // Create wave pattern
      const distance = Math.sqrt(x * x + z * z);
      const offset = distance * 0.5;
      
      // Combine sine waves for more complex movement
      const y = Math.sin(distance * 0.5 - time) * 
                Math.cos(distance * 0.3 - time * 0.7) * 
                (0.2 + normalizedBass * 0.8);
      
      cube.position.y = y;
      
      // Scale based on bass
      const scale = 1 + normalizedBass * 0.5;
      cube.scale.set(scale, scale, scale);
      
      // Rotate cubes
      cube.rotation.x += 0.01 * settings.speed;
      cube.rotation.y += 0.01 * settings.speed;
    });

    // Rotate entire group
    group.rotation.y += 0.005 * settings.speed;
    
    // Apply glitch effect if enabled
    if (settings.glitchAmount > 0) {
      const glitchScale = Math.random() * settings.glitchAmount * 0.1;
      group.position.x += (Math.random() - 0.5) * glitchScale;
      group.position.y += (Math.random() - 0.5) * glitchScale;
    }
  };

  const cleanup = () => {
    console.log("Cleaning up Pattern visualizer");
    cubes.forEach(cube => {
      cube.geometry.dispose();
      if (Array.isArray(cube.material)) {
        cube.material.forEach(m => m.dispose());
      } else {
        cube.material.dispose();
      }
    });
  };

  return { mesh: group, update, cleanup };
};

export default PatternVisualizer;