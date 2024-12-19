import * as THREE from 'three';
import type { VisualizerProps, VisualizerComponent } from './types';

const GridVisualizer = ({ analyser, settings, dataArray }: VisualizerProps): VisualizerComponent => {
  console.log("Initializing Grid visualizer with settings:", settings);

  const gridSize = parseInt(settings.patternDensity) || 16;
  const group = new THREE.Group();
  const cubes: THREE.Mesh[] = [];
  
  // Create grid of cubes
  const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  const material = new THREE.MeshPhongMaterial({
    color: 0xFFFFFF,
    specular: 0x666666,
    emissive: 0x000000,
    shininess: 10,
    transparent: true,
    opacity: 0.8
  });

  const spacing = 4 / gridSize;
  
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      const cube = new THREE.Mesh(geometry, material.clone());
      cube.position.x = (x - gridSize/2) * spacing;
      cube.position.y = (y - gridSize/2) * spacing;
      cube.position.z = 0;
      group.add(cube);
      cubes.push(cube);
    }
  }

  const update = () => {
    analyser.getByteFrequencyData(dataArray);
    
    // Get bass and snare values
    const bassValue = dataArray.slice(0, 4).reduce((a, b) => a + b, 0) / 1024;
    const snareValue = dataArray.slice(10, 20).reduce((a, b) => a + b, 0) / 2560;
    
    cubes.forEach((cube, index) => {
      const x = Math.floor(index / gridSize);
      const y = index % gridSize;
      
      // Create wave pattern
      const time = Date.now() * settings.speed * 0.001;
      const distance = Math.sqrt(
        Math.pow(x - gridSize/2, 2) + 
        Math.pow(y - gridSize/2, 2)
      );
      
      // Combine bass and wave effects
      const wave = Math.sin(distance * 0.5 + time) * settings.intensity;
      const scale = 1 + (wave + bassValue) * settings.bassResponseIntensity;
      
      cube.scale.set(scale, scale, scale);
      cube.rotation.x += settings.speed * 0.01;
      cube.rotation.y += settings.speed * 0.01;
      
      // Apply snare effect
      if (snareValue > 0.5) {
        const material = cube.material as THREE.MeshPhongMaterial;
        material.emissive.setRGB(snareValue, snareValue, snareValue);
        material.emissiveIntensity = snareValue * settings.snareResponse;
      }
      
      // Apply motion blur based on movement
      const material = cube.material as THREE.MeshPhongMaterial;
      material.opacity = 0.8 - (Math.abs(wave) * 0.3);
    });
  };

  const cleanup = () => {
    geometry.dispose();
    cubes.forEach(cube => {
      (cube.material as THREE.Material).dispose();
    });
  };

  return {
    mesh: group,
    update,
    cleanup
  };
};

export default GridVisualizer;