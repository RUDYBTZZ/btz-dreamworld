import React, { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { useToast } from "@/hooks/use-toast";
import DefaultVisualizer from './visualizers/DefaultVisualizer';
import CircularVisualizer from './visualizers/CircularVisualizer';
import WaveVisualizer from './visualizers/WaveVisualizer';
import BlocksVisualizer from './visualizers/BlocksVisualizer';
import ParticlesVisualizer from './visualizers/ParticlesVisualizer';
import ParticleBurstVisualizer from './visualizers/ParticleBurstVisualizer';
import RippleVisualizer from './visualizers/RippleVisualizer';
import PatternVisualizer from './visualizers/PatternVisualizer';
import GridVisualizer from './visualizers/GridVisualizer';
import { setupScene } from './visualizer/SceneSetup';
import { setupAnalyzer } from './visualizer/AnalyzerSetup';
import { createResizeHandler } from './visualizer/ResizeHandler';
import { cleanupVisualizer } from './visualizer/CleanupUtils';
import type { VisualizerSettings, VisualizerComponent } from './visualizers/types';

interface AudioVisualizerProps {
  audioContext: AudioContext | null;
  audioSource: MediaElementAudioSourceNode | null;
  settings: VisualizerSettings;
}

const AudioVisualizer = React.memo(({ audioContext, audioSource, settings }: AudioVisualizerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const frameIdRef = useRef<number>();
  const { toast } = useToast();

  const createVisualizer = useCallback((
    analyser: AnalyserNode,
    settings: VisualizerSettings,
    dataArray: Uint8Array
  ): VisualizerComponent => {
    console.log("Creating visualizer with settings:", settings);
    
    switch (settings.barType) {
      case 'grid':
        return GridVisualizer({ analyser, settings, dataArray });
      case 'pattern':
        return PatternVisualizer({ analyser, settings, dataArray });
      case 'circular':
        return CircularVisualizer({ analyser, settings, dataArray });
      case 'wave':
        return WaveVisualizer({ analyser, settings, dataArray });
      case 'blocks':
        return BlocksVisualizer({ analyser, settings, dataArray });
      case 'particles':
        return ParticlesVisualizer({ analyser, settings, dataArray });
      case 'particleBurst':
        return ParticleBurstVisualizer({ analyser, settings, dataArray });
      case 'ripple':
        return RippleVisualizer({ analyser, settings, dataArray });
      default:
        return DefaultVisualizer({ analyser, settings, dataArray });
    }
  }, []);

  const createAnimationLoop = useCallback((
    visualizer: VisualizerComponent,
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera
  ) => {
    return () => {
      frameIdRef.current = requestAnimationFrame(createAnimationLoop(visualizer, renderer, scene, camera));
      
      visualizer.update();
      renderer.render(scene, camera);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current || !audioContext || !audioSource) return;

    console.log("Initializing visualizer");

    const sceneSetup = setupScene(containerRef);
    if (!sceneSetup) return;

    const { scene, camera, renderer } = sceneSetup;
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    const { analyser, dataArray } = setupAnalyzer(audioContext, audioSource);
    const visualizer = createVisualizer(analyser, settings, dataArray);
    scene.add(visualizer.mesh);

    const handleResize = createResizeHandler(camera, renderer);
    window.addEventListener('resize', handleResize);

    const animate = createAnimationLoop(visualizer, renderer, scene, camera);
    animate();

    return () => {
      console.log("Cleaning up visualizer");
      window.removeEventListener('resize', handleResize);
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      cleanupVisualizer(containerRef, rendererRef.current, sceneRef.current, visualizer.mesh);
      
      if (analyser) {
        analyser.disconnect();
      }
      
      if (visualizer.cleanup) {
        visualizer.cleanup();
      }
    };
  }, [audioContext, audioSource, settings, createVisualizer, createAnimationLoop]);

  return (
    <div ref={containerRef} className="visualizer-container" />
  );
});

AudioVisualizer.displayName = 'AudioVisualizer';

export default AudioVisualizer;
