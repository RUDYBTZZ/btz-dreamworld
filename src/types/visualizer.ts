export interface VisualizerSettings {
  intensity: number;
  speed: number;
  glitchAmount: number;
  barType: string;
  sizeX: number;
  sizeY: number;
  colorScheme: string;
  waveType: 'sine' | 'square' | 'sawtooth' | 'triangle';
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
  // New properties from the UI
  backgroundColor: string;
  backgroundOpacity: number;
  backgroundPosX: number;
  backgroundPosY: number;
  backgroundScaleX: number;
  backgroundScaleY: number;
  imageBorderRadius: number;
  enableLowpass: boolean;
  enableHighpass: boolean;
  lowpassFreq: number;
  highpassFreq: number;
  smoothingTimeConstant: number;
  shape3DType: '3dtext' | 'cube' | 'sphere' | 'ring';
  textContent: string;
  textColor: string;
  bassResponseIntensity: number;
  animationSpeed: number;
}