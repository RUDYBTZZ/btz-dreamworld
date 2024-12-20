import * as THREE from 'three';

export interface VisualizerSettings {
  // Base properties
  intensity: number;
  speed: number;
  glitchAmount: number;
  barType: string;
  sizeX: number;
  sizeY: number;
  
  // Wave properties
  waveType: 'sine' | 'square' | 'sawtooth' | 'triangle';
  
  // Grid and pattern properties
  patternDensity: '8x8' | '16x16' | '24x24' | '32x32';
  gridSize: number;
  bassResponseIntensity: number;
  
  // Response properties
  bassResponse: number;
  snareResponse: number;
  
  // Visual properties
  colorScheme: string;
  shapeColor: string;
  backgroundColor: string;
  backgroundOpacity: number;
  backgroundPosX: number;
  backgroundPosY: number;
  backgroundScaleX: number;
  backgroundScaleY: number;
  
  // Animation properties
  zoomSpeed: number;
  zoomIntensity: number;
  particleCount: number;
  particleSize: number;
  particleSpeed: number;
  particleLifetime: number;
  motionBlur: number;
  trailPersistence: number;
  
  // Text properties
  textSize: number;
  textAlignment: 'left' | 'center' | 'right';
  textContent: string;
  textColor: string;
  
  // Shape properties
  shape3DType: 'grid' | 'cube' | 'sphere' | 'ring';
  shapeRotation: boolean;
  morphSpeed: number;
  
  // Effect timings
  snareAttackTime: number;
  snareDecayTime: number;
  wavePropagationSpeed: number;
  
  // Border properties
  imageBorderRadius: number;
  
  // Audio processing
  enableLowpass: boolean;
  enableHighpass: boolean;
  lowpassFreq: number;
  highpassFreq: number;
  smoothingTimeConstant: number;
  
  // Advanced features
  particleBurstIntensity: number;
  galaxySwirl: boolean;
  galaxySwirlSpeed: number;
  fluidSimulation: boolean;
  fluidViscosity: number;
  fractalDepth: number;
  fractalScale: number;
  shaderType: 'ripple' | 'distortion' | 'displacement' | 'none';
  bloomStrength: number;
  bloomRadius: number;
  enableVR: boolean;
  sceneMode: 'cosmic' | 'minimalist' | 'abstract';
  aiMoodDetection: boolean;
}

export interface VisualizerProps {
  analyser: AnalyserNode;
  settings: VisualizerSettings;
  dataArray: Uint8Array;
}

export interface VisualizerComponent {
  mesh: THREE.Object3D;
  update: () => void;
  cleanup?: () => void;
}