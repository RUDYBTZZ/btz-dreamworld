import * as THREE from 'three';

export const cleanupVisualizer = (
  containerRef: React.RefObject<HTMLDivElement>,
  renderer: THREE.WebGLRenderer | null,
  scene: THREE.Scene | null,
  visualizerMesh: THREE.Object3D | null
) => {
  console.log("Cleaning up visualizer resources");
  
  if (containerRef.current && renderer) {
    containerRef.current.removeChild(renderer.domElement);
  }
  
  if (scene && visualizerMesh) {
    scene.remove(visualizerMesh);
    
    const disposeObject = (obj: THREE.Object3D) => {
      if (obj instanceof THREE.Mesh) {
        if (obj.geometry) {
          console.log("Disposing geometry");
          obj.geometry.dispose();
        }
        
        if (obj.material) {
          console.log("Disposing material(s)");
          if (Array.isArray(obj.material)) {
            obj.material.forEach(material => {
              material.dispose();
              if (material.map) material.map.dispose();
              if (material.lightMap) material.lightMap.dispose();
              if (material.bumpMap) material.bumpMap.dispose();
              if (material.normalMap) material.normalMap.dispose();
              if (material.specularMap) material.specularMap.dispose();
              if (material.envMap) material.envMap.dispose();
            });
          } else {
            obj.material.dispose();
            if (obj.material.map) obj.material.map.dispose();
            if (obj.material.lightMap) obj.material.lightMap.dispose();
            if (obj.material.bumpMap) obj.material.bumpMap.dispose();
            if (obj.material.normalMap) obj.material.normalMap.dispose();
            if (obj.material.specularMap) obj.material.specularMap.dispose();
            if (obj.material.envMap) obj.material.envMap.dispose();
          }
        }
      }
    };

    // Recursively dispose of all objects in the scene
    visualizerMesh.traverse(disposeObject);
  }
  
  if (renderer) {
    console.log("Disposing renderer");
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement = null as any;
  }

  if (scene) {
    console.log("Clearing scene");
    scene.clear();
  }
};