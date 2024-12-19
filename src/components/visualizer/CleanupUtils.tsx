import * as THREE from 'three';

export const cleanupVisualizer = (
  containerRef: React.RefObject<HTMLDivElement>,
  renderer: THREE.WebGLRenderer | null,
  scene: THREE.Scene | null,
  visualizerMesh: THREE.Object3D | null
) => {
  console.log("Cleaning up visualizer");
  
  if (containerRef.current && renderer) {
    containerRef.current.removeChild(renderer.domElement);
  }
  
  if (scene && visualizerMesh) {
    scene.remove(visualizerMesh);
    
    if (visualizerMesh instanceof THREE.Group) {
      visualizerMesh.children.forEach(child => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach(material => material.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
    } else if (visualizerMesh instanceof THREE.Mesh) {
      visualizerMesh.geometry.dispose();
      if (Array.isArray(visualizerMesh.material)) {
        visualizerMesh.material.forEach(material => material.dispose());
      } else {
        visualizerMesh.material.dispose();
      }
    }
  }
  
  renderer?.dispose();
};