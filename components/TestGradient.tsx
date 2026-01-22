'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function TestGradient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) {
      console.log('TestGradient: Container ref is null');
      return;
    }

    console.log('TestGradient: Starting simple Three.js test...');

    try {
      // Простая сцена с кубом
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x00ff00); // Ярко зеленый для теста
      console.log('TestGradient: Scene created');

      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;
      console.log('TestGradient: Camera created');

      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      console.log('TestGradient: Renderer created');

      containerRef.current.appendChild(renderer.domElement);
      console.log('TestGradient: Renderer appended to DOM');

      // Добавляем простой куб для проверки
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Красный куб
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      console.log('TestGradient: Cube added');

      // Простая анимация
      const animate = () => {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
      };

      animate();
      console.log('TestGradient: Animation started');

      console.log('TestGradient: SUCCESS - Three.js is working!');

    } catch (error) {
      console.error('TestGradient: Three.js test failed', error);
    }
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
}
