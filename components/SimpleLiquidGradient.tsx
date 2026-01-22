'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

export default function SimpleLiquidGradient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    if (!containerRef.current) {
      console.log('SimpleLiquidGradient: Container ref is null');
      return;
    }

    console.log('SimpleLiquidGradient: Starting...', { theme, resolvedTheme });

    try {
      // Определяем цвета в зависимости от темы
      const isDark = resolvedTheme === 'dark';
      const backgroundColor = isDark ? 0x0a0e27 : 0xF3F2ED; // Темно-синий / Светло-кремовый
      const color1 = isDark ? new THREE.Vector3(0.322, 0.059, 0.412) : new THREE.Vector3(0.8, 0.4, 0.2); // Темный пурпурный #520969 / Мягкий оранжевый #CC6633
      const color2 = isDark ? new THREE.Vector3(0.039, 0.055, 0.153) : new THREE.Vector3(0.953, 0.949, 0.933); // Navy Blue / Light cream

      // Создаем сцену
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(backgroundColor);
      console.log('SimpleLiquidGradient: Scene created with background', backgroundColor.toString(16));

      // Создаем камеру
      const camera = new THREE.OrthographicCamera(
        -1, 1, 1, -1, 0, 1
      );
      console.log('SimpleLiquidGradient: Camera created');

      // Создаем рендерер
      const renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: false 
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      console.log('SimpleLiquidGradient: Renderer created');

      containerRef.current.appendChild(renderer.domElement);
      console.log('SimpleLiquidGradient: Renderer appended');

      // Создаем простой шейдерный материал
      const material = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
          uColor1: { value: color1 },
          uColor2: { value: color2 }
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          uniform vec2 uResolution;
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          varying vec2 vUv;
          
          void main() {
            vec2 uv = vUv;
            
            // Медленная анимация градиента (уменьшены скорости)
            float wave1 = sin(uv.x * 8.0 + uTime * 0.8) * 0.08; // Было 10.0 и 2.0
            float wave2 = cos(uv.y * 6.0 + uTime * 0.6) * 0.08; // Было 8.0 и 1.5
            
            vec2 distortedUv = uv + vec2(wave1, wave2);
            
            // Градиент между двумя цветами
            float gradient = (distortedUv.x + distortedUv.y) * 0.5;
            gradient = sin(gradient * 3.14159 + uTime * 0.7) * 0.5 + 0.5; // Было без * 0.7
            
            vec3 color = mix(uColor1, uColor2, gradient);
            
            gl_FragColor = vec4(color, 1.0);
          }
        `
      });

      // Создаем плоскость
      const geometry = new THREE.PlaneGeometry(2, 2);
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      console.log('SimpleLiquidGradient: Mesh created');

      // Анимация
      const clock = new THREE.Clock();
      const animate = () => {
        const delta = clock.getDelta();
        material.uniforms.uTime.value += delta * 0.5; // Уменьшаем скорость анимации
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };

      animate();
      console.log('SimpleLiquidGradient: Animation started');

      // Очистка
      return () => {
        console.log('SimpleLiquidGradient: Cleanup');
        if (containerRef.current && renderer.domElement) {
          containerRef.current.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };

    } catch (error) {
      console.error('SimpleLiquidGradient: Error', error);
    }
  }, [resolvedTheme]); // Пересоздаем при смене темы

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
}
