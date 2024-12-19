import * as THREE from 'three';
import type { VisualizerProps, VisualizerComponent } from './types';

const GridVisualizer = ({ analyser, settings, dataArray }: VisualizerProps): VisualizerComponent => {
  console.log("Initializing Grid visualizer with settings:", settings);

  // Parse grid size from pattern density setting
  const gridSize = parseInt(settings.patternDensity?.split('x')[0] || '16');
  const group = new THREE.Group();
  const cubes: THREE.Mesh[] = [];
  
  // Create optimized geometry and material
  const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  const material = new THREE.MeshPhongMaterial({
    color: 0xFFFFFF,
    specular: 0x666666,
    emissive: 0x000000,
    shininess: 10,
    transparent: true,
    opacity: 0.8,
    side: THREE.DoubleSide
  });

  // Calculate optimal spacing based on grid size
  const spacing = 4 / gridSize;
  
  // Create cube instances with optimized positioning
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

  // Pre-allocate arrays and variables for performance
  const positions = new Float32Array(cubes.length * 3);
  const rotations = new Float32Array(cubes.length * 3);
  let phase = 0;

  const update = () => {
    analyser.getByteFrequencyData(dataArray);
    
    // Optimize frequency analysis
    const bassValue = dataArray.slice(0, 4).reduce((a, b) => a + b, 0) / 1024;
    const snareValue = dataArray.slice(10, 20).reduce((a, b) => a + b, 0) / 2560;
    
    phase += 0.03 * settings.speed;

    // Batch update transformations
    cubes.forEach((cube, index) => {
      const x = Math.floor(index / gridSize);
      const y = index % gridSize;
      
      // Optimize wave pattern calculation
      const distance = Math.sqrt(
        Math.pow(x - gridSize/2, 2) + 
        Math.pow(y - gridSize/2, 2)
      );
      
      // Combine effects with optimized calculations
      const wave = Math.sin(distance * 0.5 + phase) * settings.intensity;
      const scale = 1 + (wave + bassValue) * settings.bassResponseIntensity;
      
      cube.scale.setScalar(scale);
      
      // Optimize rotation updates
      if (settings.speed > 0) {
        cube.rotation.x += settings.speed * 0.01;
        cube.rotation.y += settings.speed * 0.01;
      }
      
      // Apply optimized snare effect
      if (snareValue > 0.5) {
        const material = cube.material as THREE.MeshPhongMaterial;
        material.emissive.setRGB(snareValue, snareValue, snareValue);
        material.emissiveIntensity = snareValue * settings.snareResponse;
      }
      
      // Apply motion blur based on movement
      const material = cube.material as THREE.MeshPhongMaterial;
      material.opacity = Math.max(0.4, 0.8 - (Math.abs(wave) * 0.3));
    });

    // Apply global transformations
    if (settings.glitchAmount > 0) {
      const glitchScale = Math.random() * settings.glitchAmount * 0.1;
      group.position.x += (Math.random() - 0.5) * glitchScale;
      group.position.y += (Math.random() - 0.5) * glitchScale;
    }
  };

  const cleanup = () => {
    console.log("Cleaning up Grid visualizer");
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