import * as THREE from 'three';

export interface VisualizerSettings {
  intensity: number;
  speed: number;
  glitchAmount: number;
  barType: string;
  sizeX: number;
  sizeY: number;
  colorScheme: string;
  zoomSpeed: number;
  zoomIntensity: number;
  bassResponse: number;
  snareResponse: number;
  particleCount: number;
  particleSize: number;
  particleSpeed: number;
  textSize: number;
  textAlignment: 'left' | 'center' | 'right';
  shapeRotation: boolean;
  shapeColor: string;
}

export interface VisualizerProps {
  analyser: AnalyserNode;
  settings: VisualizerSettings;
  dataArray: Uint8Array;
}

export interface VisualizerComponent {
  mesh: THREE.Object3D;
  update: () => void;
}