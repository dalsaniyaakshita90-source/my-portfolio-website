import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3DCanvas: React.FC<{ onInteract?: () => void }> = ({ onInteract }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let frameId: number;
    const width = mount.clientWidth || 360;
    const height = mount.clientHeight || 360;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.replaceChildren(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xfbbf24, 2.5);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x6366f1, 2.0);
    dirLight2.position.set(-5, -5, 2);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0x38bdf8, 3, 10);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // Main 3D Crystal / Polyhedron (Icosahedron & Wireframe Cage)
    const crystalGroup = new THREE.Group();
    scene.add(crystalGroup);

    // Inner Glowing Core
    const innerGeo = new THREE.SphereGeometry(0.75, 24, 24);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.9,
      roughness: 0.1,
      metalness: 0.9
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    crystalGroup.add(innerCore);

    // Outer Glass Dodecahedron
    const outerGeo = new THREE.IcosahedronGeometry(1.7, 0);
    const outerMat = new THREE.MeshPhysicalMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.55,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.85,
      ior: 1.5,
      thickness: 1.2,
      wireframe: false
    });
    const outerCrystal = new THREE.Mesh(outerGeo, outerMat);
    crystalGroup.add(outerCrystal);

    // Wireframe Cage
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const wireCage = new THREE.Mesh(outerGeo, wireMat);
    wireCage.scale.set(1.03, 1.03, 1.03);
    crystalGroup.add(wireCage);

    // Orbital Rings
    const ringGeo = new THREE.TorusGeometry(2.3, 0.02, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.4
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 3;
    crystalGroup.add(ring1);

    const ring2 = new THREE.Mesh(ringGeo, ringMat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = Math.PI / 6;
    crystalGroup.add(ring2);

    // Mouse Drag Rotation
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    const targetRot = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
      if (onInteract) onInteract();
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - prevMouse.x;
        const deltaY = e.clientY - prevMouse.y;
        targetRot.y += deltaX * 0.01;
        targetRot.x += deltaY * 0.01;
        prevMouse = { x: e.clientX, y: e.clientY };
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    mount.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Resize
    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth || 360;
      const h = mount.clientHeight || 360;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Continuous gentle rotation
      crystalGroup.rotation.y += 0.008;
      crystalGroup.rotation.x += 0.004;

      // Inertia drag rotation
      crystalGroup.rotation.y += (targetRot.y - crystalGroup.rotation.y) * 0.08;
      crystalGroup.rotation.x += (targetRot.x - crystalGroup.rotation.x) * 0.08;

      ring1.rotation.z = elapsed * 0.4;
      ring2.rotation.z = -elapsed * 0.3;

      const breathe = 1 + Math.sin(elapsed * 2) * 0.05;
      innerCore.scale.set(breathe, breathe, breathe);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      mount.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      outerGeo.dispose();
      innerGeo.dispose();
      ringGeo.dispose();
    };
  }, [onInteract]);

  return (
    <div className="relative w-full h-[320px] md:h-[380px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none">
      <div ref={mountRef} className="w-full h-full" />
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[11px] font-mono text-slate-400/80 bg-slate-900/60 px-3 py-1 rounded-full border border-slate-700/50 backdrop-blur pointer-events-none whitespace-nowrap">
        ✦ Drag 3D Inclusion Core to Rotate
      </div>
    </div>
  );
};
