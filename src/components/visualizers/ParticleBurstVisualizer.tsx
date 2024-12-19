import * as THREE from 'three';
import { VisualizerProps } from './types';

const ParticleBurstVisualizer = ({ analyser, settings, dataArray }: VisualizerProps) => {
  console.log("Initializing ParticleBurst visualizer with settings:", settings);

  // Create particle system
  const particleCount = 1000;
  const particles = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    // Initial positions in sphere formation
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * 2;
    positions[i] = Math.cos(angle) * radius;
    positions[i + 1] = Math.sin(angle) * radius;
    positions[i + 2] = (Math.random() - 0.5) * 2;
    
    // Random velocities
    velocities[i] = (Math.random() - 0.5) * 0.02;
    velocities[i + 1] = (Math.random() - 0.5) * 0.02;
    velocities[i + 2] = (Math.random() - 0.5) * 0.02;
  }

  particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const particleMaterial = new THREE.PointsMaterial({
    color: 0x9b87f5,
    size: 0.05,
    transparent: true,
    blending: THREE.AdditiveBlending
  });

  const particleSystem = new THREE.Points(particles, particleMaterial);

  const update = () => {
    analyser.getByteFrequencyData(dataArray);
    const positions = particles.attributes.position.array as Float32Array;
    const bassValue = (dataArray[0] / 255) * settings.intensity;

    for (let i = 0; i < positions.length; i += 3) {
      // Update positions based on velocities and bass
      positions[i] += velocities[i] * settings.speed * (1 + bassValue);
      positions[i + 1] += velocities[i + 1] * settings.speed * (1 + bassValue);
      positions[i + 2] += velocities[i + 2] * settings.speed * (1 + bassValue);

      // Reset particles that go too far
      const distance = Math.sqrt(
        positions[i] ** 2 + 
        positions[i + 1] ** 2 + 
        positions[i + 2] ** 2
      );

      if (distance > 3) {
        positions[i] *= 0.1;
        positions[i + 1] *= 0.1;
        positions[i + 2] *= 0.1;
      }
    }

    particles.attributes.position.needsUpdate = true;
    particleSystem.rotation.y += 0.001 * settings.speed;
  };

  return { mesh: particleSystem, update };
};

export default ParticleBurstVisualizer;