import * as THREE from 'three';
import type { VisualizerProps, VisualizerComponent } from './types';

const WaveVisualizer = ({ analyser, settings, dataArray }: VisualizerProps): VisualizerComponent => {
  console.log("Initializing Wave visualizer with settings:", settings);

  // Optimize geometry creation
  const segments = 100;
  const points = new Array(segments).fill(0).map((_, i) => 
    new THREE.Vector3(i/10 - 5, 0, 0)
  );
  
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ 
    color: 0x9b87f5,
    linewidth: 2
  });
  
  const wave = new THREE.Line(geometry, material);
  const positions = wave.geometry.attributes.position;

  // Pre-calculate wave parameters
  const generateWaveform = (time: number, type: string = 'sine', frequency: number, amplitude: number) => {
    switch (type) {
      case 'square':
        return Math.sin(frequency * time) >= 0 ? amplitude : -amplitude;
      case 'sawtooth':
        return ((time * frequency) % (2 * Math.PI)) / Math.PI - 1 * amplitude;
      case 'triangle':
        return (Math.abs(((time * frequency) % (2 * Math.PI)) / Math.PI - 1) * 2 - 1) * amplitude;
      default: // sine
        return Math.sin(frequency * time) * amplitude;
    }
  };

  const update = () => {
    analyser.getByteFrequencyData(dataArray);
    const average = (dataArray.reduce((a, b) => a + b) / dataArray.length) * settings.intensity;
    const time = Date.now() * 0.001;
    
    const waveType = settings.waveType || 'sine';
    const frequency = 2 + settings.speed * 3;
    const amplitude = 0.5 + average * 0.01;
    
    // Batch update positions
    for (let i = 0; i < positions.count; i++) {
      const t = time + (i / positions.count) * Math.PI * 2;
      const y = generateWaveform(t, waveType, frequency, amplitude);
      positions.setY(i, y);
    }
    
    positions.needsUpdate = true;
    wave.rotation.z += 0.001 * settings.speed;
  };

  const cleanup = () => {
    console.log("Cleaning up Wave visualizer");
    geometry.dispose();
    material.dispose();
  };

  return { mesh: wave, update, cleanup };
};

export default WaveVisualizer;