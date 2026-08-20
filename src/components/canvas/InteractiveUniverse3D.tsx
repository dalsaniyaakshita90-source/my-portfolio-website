import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ViewMode3D } from '../../types';
import { soundEngine } from '../AudioAmbience';

interface UniverseNode {
  id: string;
  name: string;
  category: string;
  quote: string;
  position: THREE.Vector3;
  color: number;
  mesh?: THREE.Mesh;
  haloMesh?: THREE.Mesh;
  targetSection: string;
}

interface InteractiveUniverse3DProps {
  viewMode: ViewMode3D;
  onNodeSelect?: (nodeId: string, targetSection: string) => void;
}

export const InteractiveUniverse3D: React.FC<InteractiveUniverse3DProps> = ({
  viewMode,
  onNodeSelect
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeHoverNode, setActiveHoverNode] = useState<UniverseNode | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x03060f, 0.012);

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, 0, 48);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.replaceChildren(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xfbbf24, 2.5, 140);
    pointLight1.position.set(25, 25, 20);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x6366f1, 2.0, 140);
    pointLight2.position.set(-25, -20, 15);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xf43f5e, 2.2, 100);
    pointLight3.position.set(0, 30, -10);
    scene.add(pointLight3);

    // 4. Stardust Particles Cloud
    const particleCount = 1000;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const goldColor = new THREE.Color(0xfbbf24);
    const indigoColor = new THREE.Color(0x818cf8);
    const roseColor = new THREE.Color(0xf43f5e);
    const cyanColor = new THREE.Color(0x38bdf8);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      const radius = 28 + Math.random() * 55;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[idx] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[idx + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[idx + 2] = radius * Math.cos(phi);

      const colorPick = i % 4 === 0 ? goldColor : i % 4 === 1 ? indigoColor : i % 4 === 2 ? roseColor : cyanColor;
      particleColors[idx] = colorPick.r;
      particleColors[idx + 1] = colorPick.g;
      particleColors[idx + 2] = colorPick.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.6,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });

    const starParticles = new THREE.Points(particleGeo, particleMat);
    scene.add(starParticles);

    // 5. Interactive Planetary Nodes (8 Universal Hubs)
    const coreNodesData: Omit<UniverseNode, 'mesh' | 'haloMesh'>[] = [
      {
        id: 'hero-hub',
        name: 'Akshita Dalsaniya',
        category: 'Exploring. Learning. Becoming.',
        quote: 'Knowledge is an endless universe.',
        position: new THREE.Vector3(0, 14, -4),
        color: 0xfbbf24,
        targetSection: 'hero'
      },
      {
        id: 'manifesto-hub',
        name: 'Personal Manifesto',
        category: 'What I Believe',
        quote: 'Every person carries something unique within them.',
        position: new THREE.Vector3(-16, 9, 3),
        color: 0x818cf8,
        targetSection: 'manifesto'
      },
      {
        id: 'chapters-hub',
        name: 'Chapters of Evolution',
        category: 'Lifelong Journey',
        quote: 'Curiosity found its first playground long before research papers.',
        position: new THREE.Vector3(16, 9, -2),
        color: 0x38bdf8,
        targetSection: 'chapters'
      },
      {
        id: 'research-hub',
        name: 'Research Laboratory',
        category: 'Ocean Philosophy',
        quote: 'Research is like an ocean. The deeper you go, the more truth you uncover.',
        position: new THREE.Vector3(-18, -8, 5),
        color: 0x10b981,
        targetSection: 'research'
      },
      {
        id: 'projectl3-hub',
        name: 'Project L³ (Love. Laughter. Life.)',
        category: 'Disability Inclusion',
        quote: 'Building a future where inclusion is not an exception, but the foundation.',
        position: new THREE.Vector3(0, -3, 6),
        color: 0xf43f5e,
        targetSection: 'project-l3'
      },
      {
        id: 'creative-hub',
        name: 'Creative Expression',
        category: 'Novel, Poetry & Voice Mimicry',
        quote: 'A world without art is just a mere piece of land.',
        position: new THREE.Vector3(18, -8, 2),
        color: 0xa855f7,
        targetSection: 'creative'
      },
      {
        id: 'recognition-hub',
        name: 'Recognition & Distinctions',
        category: '11 Verified Credentials',
        quote: 'Recognition is not the goal. Growth is.',
        position: new THREE.Vector3(-10, -18, -3),
        color: 0xf59e0b,
        targetSection: 'recognition'
      },
      {
        id: 'contact-hub',
        name: 'Conversation & Collaboration',
        category: 'Let’s Connect',
        quote: 'Some of the most meaningful opportunities begin with nothing more than a conversation.',
        position: new THREE.Vector3(10, -18, -3),
        color: 0xec4899,
        targetSection: 'contact'
      }
    ];

    const nodesGroup = new THREE.Group();
    scene.add(nodesGroup);

    const interactiveMeshList: THREE.Mesh[] = [];
    const instantiatedNodes: UniverseNode[] = [];

    const sphereGeo = new THREE.SphereGeometry(1.5, 32, 32);
    const haloGeo = new THREE.RingGeometry(1.9, 2.4, 32);

    coreNodesData.forEach((item) => {
      const nodeMat = new THREE.MeshStandardMaterial({
        color: item.color,
        emissive: item.color,
        emissiveIntensity: 0.6,
        roughness: 0.15,
        metalness: 0.85
      });

      const nodeMesh = new THREE.Mesh(sphereGeo, nodeMat);
      nodeMesh.position.copy(item.position);
      nodeMesh.userData = { nodeId: item.id };
      nodesGroup.add(nodeMesh);
      interactiveMeshList.push(nodeMesh);

      // Orbital Halo Ring
      const haloMat = new THREE.MeshBasicMaterial({
        color: item.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.45
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      haloMesh.position.copy(item.position);
      haloMesh.rotation.x = Math.PI / 2.3;
      nodesGroup.add(haloMesh);

      instantiatedNodes.push({
        ...item,
        mesh: nodeMesh,
        haloMesh
      });
    });

    // 6. Constellation Connecting Filaments
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });

    const linesGroup = new THREE.Group();
    scene.add(linesGroup);

    // Connect Project L³ central node to all hubs
    const centerNode = instantiatedNodes[4]; // Project L3
    for (let i = 0; i < instantiatedNodes.length; i++) {
      if (i !== 4) {
        const points = [centerNode.position, instantiatedNodes[i].position];
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
        linesGroup.add(new THREE.Line(lineGeo, lineMat));
      }
    }

    // Connect adjacent nodes in ring
    for (let i = 0; i < instantiatedNodes.length; i++) {
      const nextIdx = (i + 1) % instantiatedNodes.length;
      const points = [instantiatedNodes[i].position, instantiatedNodes[nextIdx].position];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      linesGroup.add(new THREE.Line(lineGeo, lineMat));
    }

    // 7. Mouse and Scroll Tracking
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-1000, -1000);
    const targetRotation = { x: 0, y: 0 };
    let scrollProgress = 0;

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };
    window.addEventListener('scroll', handleScroll);

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      targetRotation.y = (e.clientX / window.innerWidth - 0.5) * 0.5;
      targetRotation.x = (e.clientY / window.innerHeight - 0.5) * 0.5;
    };

    const onClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshList);
      if (intersects.length > 0) {
        const hitMesh = intersects[0].object as THREE.Mesh;
        const matched = instantiatedNodes.find((n) => n.id === hitMesh.userData.nodeId);
        if (matched) {
          soundEngine.playNodeSelect();
          if (onNodeSelect) {
            onNodeSelect(matched.id, matched.targetSection);
          }
          const targetEl = document.getElementById(matched.targetSection);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    const onResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', onResize);
    container.addEventListener('mousemove', onPointerMove);
    container.addEventListener('click', onClick);

    // 8. Cinematic Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Scroll-dependent 3D cinematic depth pan
      const targetCamY = 10 - scrollProgress * 28;
      camera.position.y += (targetCamY - camera.position.y) * 0.05;
      camera.position.z = 46 + Math.sin(scrollProgress * Math.PI) * 8;

      // Mouse inertia rotation
      nodesGroup.rotation.y += (targetRotation.y + scrollProgress * 1.5 - nodesGroup.rotation.y) * 0.03;
      nodesGroup.rotation.x += (targetRotation.x - nodesGroup.rotation.x) * 0.03;
      linesGroup.rotation.copy(nodesGroup.rotation);

      starParticles.rotation.y = elapsed * 0.015;
      starParticles.rotation.x = elapsed * 0.008;

      // Pulsing nodes
      instantiatedNodes.forEach((node, index) => {
        if (node.mesh && node.haloMesh) {
          const breathe = 1 + Math.sin(elapsed * 2.2 + index) * 0.08;
          node.mesh.scale.set(breathe, breathe, breathe);
          node.haloMesh.rotation.z = elapsed * 0.6 + index;
        }
      });

      // Hover Raycast
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshList);
      if (intersects.length > 0) {
        const hitMesh = intersects[0].object as THREE.Mesh;
        const matched = instantiatedNodes.find((n) => n.id === hitMesh.userData.nodeId);
        if (matched) {
          container.style.cursor = 'pointer';
          setActiveHoverNode(matched);
        }
      } else {
        container.style.cursor = 'default';
        setActiveHoverNode(null);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', onResize);
      container.removeEventListener('mousemove', onPointerMove);
      container.removeEventListener('click', onClick);
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      sphereGeo.dispose();
      haloGeo.dispose();
    };
  }, [viewMode, onNodeSelect]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto overflow-hidden">
      <div ref={containerRef} className="w-full h-full" />

      {/* Floating 3D Interactive Node Info Tooltip */}
      {activeHoverNode && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-40 pointer-events-none transition-all duration-300 animate-fadeIn">
          <div className="liquid-glass-strong px-6 py-3.5 rounded-2xl max-w-md text-center shadow-2xl border border-amber-400/40">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-300">
                {activeHoverNode.category}
              </span>
            </div>
            <h4 className="text-lg font-serif font-bold text-white tracking-wide">
              {activeHoverNode.name}
            </h4>
            <p className="text-xs text-slate-300 italic mt-1 font-light">
              &ldquo;{activeHoverNode.quote}&rdquo;
            </p>
            <p className="text-[10px] text-amber-400 mt-2 font-mono">
              ✦ Click to jump to {activeHoverNode.name} →
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
