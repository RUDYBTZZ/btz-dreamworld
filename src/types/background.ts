export type BackgroundType = 
  | 'color'
  | 'image'
  | 'particles'
  | 'spaceWave'
  | 'glassCircuit'
  | 'patterns'
  | 'turbulentLight'
  | 'vinylAndParticles'
  | 'spaceWaves'
  | 'theCity'
  | 'cosmicClouds'
  | 'the80sOnASCII'
  | 'wetFuzzyDisco'
  | 'iSeeSound'
  | 'amiga'
  | 'swarm';

export interface BackgroundSettings {
  type: BackgroundType;
  color?: string;
  imageUrl?: string;
  intensity?: number;
  speed?: number;
}