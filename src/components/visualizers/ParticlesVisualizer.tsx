import * as THREE from 'three';
import { useMemo } from 'react';
import type { VisualizerProps, VisualizerComponent } from './types';

const ParticlesVisualizer = ({ analyser, settings, dataArray }: VisualizerProps): VisualizerComponent => {
  console.log("Initializing Particles visualizer with settings:", settings);

  const { particles, particleGeometry, particleMaterial } = useMemo(() => {
    const particles = new THREE.Group();
    const particleGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const particleMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x9b87f5,
      specular: 0x9b87f5,
      shininess: 100,
    });
    
    for (let i = 0; i < 50; i++) {
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      particle.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      particles.add(particle);
    }

    return { particles, particleGeometry, particleMaterial };
  }, []);

  const update = () => {
    analyser.getByteFrequencyData(dataArray);
    particles.children.forEach((particle: THREE.Mesh, i) => {
      const frequency = dataArray[i % dataArray.length] * settings.intensity;
      particle.position.y = Math.sin(Date.now() * 0.001 * settings.speed + i) * (1 + frequency * 0.01);
      particle.rotation.x += 0.01 * settings.speed;
    });
  };

  return { mesh: particles, update };
};

export default ParticlesVisualizer;