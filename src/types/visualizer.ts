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