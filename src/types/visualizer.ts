import * as THREE from 'three';
import { z } from 'zod';

export const VisualizerSettingsSchema = z.object({
  intensity: z.number().min(0).max(1),
  speed: z.number().min(0).max(1),
  glitchAmount: z.number().min(0).max(1),
  barType: z.enum(['default', 'circular', 'wave', 'blocks', 'particles', 'particleBurst', 'ripple', 'pattern', 'grid', 'snare']),
  sizeX: z.number().min(100).max(2000),
  sizeY: z.number().min(100).max(2000),
  colorScheme: z.enum(['default', 'neon', 'sunset', 'rainbow', 'monochrome', 'duotone', 'tritone']),
  waveType: z.enum(['sine', 'square', 'sawtooth', 'triangle']),
  zoomSpeed: z.number().min(0).max(1),
  zoomIntensity: z.number().min(0).max(1),
  bassResponse: z.number().min(0).max(1),
  snareResponse: z.number().min(0).max(1),
  particleCount: z.number().min(0).max(1000),
  particleSize: z.number().min(0).max(10),
  particleSpeed: z.number().min(0).max(1),
  textSize: z.number().min(8).max(100),
  textAlignment: z.enum(['left', 'center', 'right']),
  shapeRotation: z.boolean(),
  shapeColor: z.string(),
  backgroundColor: z.string(),
  backgroundOpacity: z.number().min(0).max(1),
  backgroundPosX: z.number(),
  backgroundPosY: z.number(),
  backgroundScaleX: z.number().positive(),
  backgroundScaleY: z.number().positive(),
  imageBorderRadius: z.number().min(0),
  enableLowpass: z.boolean(),
  enableHighpass: z.boolean(),
  lowpassFreq: z.number().positive(),
  highpassFreq: z.number().positive(),
  smoothingTimeConstant: z.number().min(0).max(1),
  shape3DType: z.enum(['3dtext', 'cube', 'sphere', 'ring', 'grid']),
  textContent: z.string(),
  textColor: z.string(),
  bassResponseIntensity: z.number().min(0).max(1),
  animationSpeed: z.number().min(0).max(1),
  gridSize: z.number().min(8).max(32),
  motionBlur: z.number().min(0).max(5),
  trailPersistence: z.number().min(5).max(8),
  patternDensity: z.enum(['8x8', '16x16', '24x24', '32x32']),
  snareAttackTime: z.number().min(5).max(10),
  snareDecayTime: z.number().min(200).max(500),
  particleLifetime: z.number().min(300).max(800),
  wavePropagationSpeed: z.number().min(100).max(500)
});

export type VisualizerSettings = z.infer<typeof VisualizerSettingsSchema>;

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