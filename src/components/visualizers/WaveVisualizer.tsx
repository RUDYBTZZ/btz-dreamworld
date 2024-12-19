import * as THREE from 'three';
import type { VisualizerProps, VisualizerComponent } from './types';

const WaveVisualizer = ({ analyser, settings, dataArray }: VisualizerProps): VisualizerComponent => {
  console.log("Initializing Wave visualizer with settings:", settings);

  const points = [];
  const segments = 100;
  
  for (let i = 0; i < segments; i++) {
    points.push(new THREE.Vector3(i/10 - 5, 0, 0));
  }
  
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ 
    color: 0x9b87f5,
    linewidth: 2
  });
  
  const wave = new THREE.Line(geometry, material);
  const positions = wave.geometry.attributes.position;

  const generateWaveform = (time: number, type: string, frequency: number, amplitude: number) => {
    let y = 0;
    switch (type) {
      case 'sine':
        y = Math.sin(frequency * time) * amplitude;
        break;
      case 'square':
        y = Math.sin(frequency * time) >= 0 ? amplitude : -amplitude;
        break;
      case 'sawtooth':
        y = ((time * frequency) % (2 * Math.PI)) / Math.PI - 1;
        y *= amplitude;
        break;
      case 'triangle':
        y = Math.abs(((time * frequency) % (2 * Math.PI)) / Math.PI - 1);
        y = (y * 2 - 1) * amplitude;
        break;
      default:
        y = Math.sin(frequency * time) * amplitude;
    }
    return y;
  };

  const update = () => {
    analyser.getByteFrequencyData(dataArray);
    const average = (dataArray.reduce((a, b) => a + b) / dataArray.length) * settings.intensity;
    const time = Date.now() * 0.001;
    
    // Use the waveType from settings, defaulting to 'sine' if not specified
    const waveType = settings.waveType || 'sine';
    const frequency = 2 + settings.speed * 3;
    const amplitude = 0.5 + average * 0.01;
    
    for (let i = 0; i < positions.count; i++) {
      const t = time + (i / positions.count) * Math.PI * 2;
      const y = generateWaveform(t, waveType, frequency, amplitude);
      positions.setY(i, y);
    }
    
    positions.needsUpdate = true;
    wave.rotation.z += 0.001 * settings.speed;
  };

  const cleanup = () => {
    geometry.dispose();
    material.dispose();
  };

  return { mesh: wave, update, cleanup };
};

export default WaveVisualizer;