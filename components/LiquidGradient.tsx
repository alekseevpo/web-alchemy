'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

interface ColorScheme {
  color1: THREE.Vector3;
  color2: THREE.Vector3;
  color3?: THREE.Vector3;
}

interface LiquidGradientProps {
  className?: string;
  colorScheme?: number;
  intensity?: number;
  speed?: number;
}

// TouchTexture class
class TouchTexture {
  size: number;
  width: number;
  height: number;
  maxAge: number;
  radius: number;
  speed: number;
  trail: any[];
  last: any;
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;
  texture!: THREE.Texture;

  constructor() {
    this.size = 64;
    this.width = this.height = this.size;
    this.maxAge = 64;
    this.radius = 0.25 * this.size;
    this.speed = 1 / this.maxAge;
    this.trail = [];
    this.last = null;
    this.initTexture();
  }

  initTexture() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext('2d')!;
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.texture = new THREE.Texture(this.canvas);
  }

  update() {
    this.clear();
    let speed = this.speed;
    
    for (let i = this.trail.length - 1; i >= 0; i--) {
      const point = this.trail[i];
      let f = point.force * speed * (1 - point.age / this.maxAge);
      point.x += point.vx * f;
      point.y += point.vy * f;
      point.age++;
      
      if (point.age > this.maxAge) {
        this.trail.splice(i, 1);
      } else {
        this.drawPoint(point);
      }
    }
    this.texture.needsUpdate = true;
  }

  clear() {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  addTouch(point: any) {
    let force = 0;
    let vx = 0;
    let vy = 0;
    const last = this.last;
    
    if (last) {
      const dx = point.x - last.x;
      const dy = point.y - last.y;
      if (dx === 0 && dy === 0) return;
      const dd = dx * dx + dy * dy;
      let d = Math.sqrt(dd);
      vx = dx / d;
      vy = dy / d;
      force = Math.min(dd * 20000, 2.0);
    }
    
    this.last = { x: point.x, y: point.y };
    this.trail.push({ x: point.x, y: point.y, age: 0, force, vx, vy });
  }

  drawPoint(point: any) {
    const pos = { x: point.x * this.width, y: (1 - point.y) * this.height };
    let intensity = 1;
    
    if (point.age < this.maxAge * 0.3) {
      intensity = Math.sin((point.age / (this.maxAge * 0.3)) * (Math.PI / 2));
    } else {
      const t = 1 - (point.age - this.maxAge * 0.3) / (this.maxAge * 0.7);
      intensity = -t * (t - 2);
    }
    
    intensity *= point.force;
    const radius = this.radius;
    let color = `${((point.vx + 1) / 2) * 255}, ${((point.vy + 1) / 2) * 255}, ${intensity * 255}`;
    let offset = this.size * 5;
    
    this.ctx.shadowOffsetX = offset;
    this.ctx.shadowOffsetY = offset;
    this.ctx.shadowBlur = radius * 1;
    this.ctx.shadowColor = `rgba(${color},${0.2 * intensity})`;
    this.ctx.beginPath();
    this.ctx.fillStyle = 'rgba(255,0,0,1)';
    this.ctx.arc(pos.x - offset, pos.y - offset, radius, 0, Math.PI * 2);
    this.ctx.fill();
  }
}

// GradientBackground class
class GradientBackground {
  mesh: THREE.Mesh | null = null;
  uniforms: any;
  scene: THREE.Scene;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uColor1: { value: new THREE.Vector3(0.945, 0.353, 0.133) }, // F15A22 - Orange
      uColor2: { value: new THREE.Vector3(0.039, 0.055, 0.153) }, // 0a0e27 - Navy Blue
      uColor3: { value: new THREE.Vector3(0.945, 0.353, 0.133) }, // F15A22 - Orange
      uColor4: { value: new THREE.Vector3(0.039, 0.055, 0.153) }, // 0a0e27 - Navy Blue
      uColor5: { value: new THREE.Vector3(0.945, 0.353, 0.133) }, // F15A22 - Orange
      uColor6: { value: new THREE.Vector3(0.039, 0.055, 0.153) }, // 0a0e27 - Navy Blue
      uSpeed: { value: 1.2 },
      uIntensity: { value: 1.8 },
      uTouchTexture: { value: null },
      uGrainIntensity: { value: 0.08 },
      uZoom: { value: 1.0 },
      uDarkNavy: { value: new THREE.Vector3(0.039, 0.055, 0.153) }, // #0a0e27 - Dark navy
      uGradientSize: { value: 1.0 },
      uGradientCount: { value: 6.0 },
      uColor1Weight: { value: 1.0 },
      uColor2Weight: { value: 1.0 }
    };
  }

  init() {
    const geometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight, 1, 1);
    
    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vec3 pos = position.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          vUv = uv;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        uniform vec3 uColor4;
        uniform vec3 uColor5;
        uniform vec3 uColor6;
        uniform float uSpeed;
        uniform float uIntensity;
        uniform sampler2D uTouchTexture;
        uniform float uGrainIntensity;
        uniform float uZoom;
        uniform vec3 uDarkNavy;
        uniform float uGradientSize;
        uniform float uGradientCount;
        uniform float uColor1Weight;
        uniform float uColor2Weight;
        varying vec2 vUv;
        
        #define PI 3.14159265359
        
        float grain(vec2 uv, float time) {
          vec2 grainUv = uv * uResolution * 0.5;
          float grainValue = fract(sin(dot(grainUv + time, vec2(12.9898, 78.233))) * 43758.5453);
          return grainValue * 2.0 - 1.0;
        }
        
        vec3 getGradientColor(vec2 uv, float time) {
          float gradientRadius = uGradientSize;
          
          vec2 center1 = vec2(0.5 + sin(time * uSpeed * 0.4) * 0.4, 0.5 + cos(time * uSpeed * 0.5) * 0.4);
          vec2 center2 = vec2(0.5 + cos(time * uSpeed * 0.6) * 0.5, 0.5 + sin(time * uSpeed * 0.45) * 0.5);
          vec2 center3 = vec2(0.5 + sin(time * uSpeed * 0.35) * 0.45, 0.5 + cos(time * uSpeed * 0.55) * 0.45);
          vec2 center4 = vec2(0.5 + cos(time * uSpeed * 0.5) * 0.4, 0.5 + sin(time * uSpeed * 0.4) * 0.4);
          vec2 center5 = vec2(0.5 + sin(time * uSpeed * 0.7) * 0.35, 0.5 + cos(time * uSpeed * 0.6) * 0.35);
          vec2 center6 = vec2(0.5 + cos(time * uSpeed * 0.45) * 0.5, 0.5 + sin(time * uSpeed * 0.65) * 0.5);
          
          float dist1 = length(uv - center1);
          float dist2 = length(uv - center2);
          float dist3 = length(uv - center3);
          float dist4 = length(uv - center4);
          float dist5 = length(uv - center5);
          float dist6 = length(uv - center6);
          
          float influence1 = 1.0 - smoothstep(0.0, gradientRadius, dist1);
          float influence2 = 1.0 - smoothstep(0.0, gradientRadius, dist2);
          float influence3 = 1.0 - smoothstep(0.0, gradientRadius, dist3);
          float influence4 = 1.0 - smoothstep(0.0, gradientRadius, dist4);
          float influence5 = 1.0 - smoothstep(0.0, gradientRadius, dist5);
          float influence6 = 1.0 - smoothstep(0.0, gradientRadius, dist6);
          
          vec3 color = vec3(0.0);
          color += uColor1 * influence1 * (0.55 + 0.45 * sin(time * uSpeed)) * uColor1Weight;
          color += uColor2 * influence2 * (0.55 + 0.45 * cos(time * uSpeed * 1.2)) * uColor2Weight;
          color += uColor3 * influence3 * (0.55 + 0.45 * sin(time * uSpeed * 0.8)) * uColor1Weight;
          color += uColor4 * influence4 * (0.55 + 0.45 * cos(time * uSpeed * 1.3)) * uColor2Weight;
          color += uColor5 * influence5 * (0.55 + 0.45 * sin(time * uSpeed * 1.1)) * uColor1Weight;
          color += uColor6 * influence6 * (0.55 + 0.45 * cos(time * uSpeed * 0.9)) * uColor2Weight;
          
          color = clamp(color, vec3(0.0), vec3(1.0)) * uIntensity;
          
          float luminance = dot(color, vec3(0.299, 0.587, 0.114));
          color = mix(vec3(luminance), color, 1.35);
          color = pow(color, vec3(0.92));
          
          float brightness1 = length(color);
          float mixFactor1 = max(brightness1 * 1.2, 0.15);
          color = mix(uDarkNavy, color, mixFactor1);
          
          float maxBrightness = 1.0;
          float brightness = length(color);
          if (brightness > maxBrightness) {
            color = color * (maxBrightness / brightness);
          }
          
          return color;
        }
        
        void main() {
          vec2 uv = vUv;
          
          vec4 touchTex = texture2D(uTouchTexture, uv);
          float vx = -(touchTex.r * 2.0 - 1.0);
          float vy = -(touchTex.g * 2.0 - 1.0);
          float intensity = touchTex.b;
          
          uv.x += vx * 0.8 * intensity;
          uv.y += vy * 0.8 * intensity;
          
          vec2 center = vec2(0.5);
          float dist = length(uv - center);
          float ripple = sin(dist * 20.0 - uTime * 3.0) * 0.04 * intensity;
          float wave = sin(dist * 15.0 - uTime * 2.0) * 0.03 * intensity;
          uv += vec2(ripple + wave);
          
          vec3 color = getGradientColor(uv, uTime);
          
          float grainValue = grain(uv, uTime);
          color += grainValue * uGrainIntensity;
          
          float timeShift = uTime * 0.5;
          color.r += sin(timeShift) * 0.02;
          color.g += cos(timeShift * 1.4) * 0.02;
          color.b += sin(timeShift * 1.2) * 0.02;
          
          float brightness2 = length(color);
          float mixFactor2 = max(brightness2 * 1.2, 0.15);
          color = mix(uDarkNavy, color, mixFactor2);
          
          color = clamp(color, vec3(0.0), vec3(1.0));
          
          float maxBrightness = 1.0;
          float brightness = length(color);
          if (brightness > maxBrightness) {
            color = color * (maxBrightness / brightness);
          }
          
          gl_FragColor = vec4(color, 1.0);
        }
      `
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.z = 0;
    this.scene.add(this.mesh);
  }

  update(delta: number) {
    if (this.uniforms.uTime) {
      this.uniforms.uTime.value += delta;
    }
  }

  onResize(width: number, height: number) {
    if (this.mesh) {
      this.mesh.geometry.dispose();
      this.mesh.geometry = new THREE.PlaneGeometry(width, height, 1, 1);
    }
    if (this.uniforms.uResolution) {
      this.uniforms.uResolution.value.set(width, height);
    }
  }
}

export default function LiquidGradient({ className, colorScheme = 1, intensity = 1.8, speed = 1.2 }: LiquidGradientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const gradientBackgroundRef = useRef<GradientBackground | null>(null);
  const touchTextureRef = useRef<TouchTexture | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const clockRef = useRef<THREE.Clock | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const { theme, systemTheme, resolvedTheme } = useTheme();

  console.log('LiquidGradient: Theme info', { theme, systemTheme, resolvedTheme });

  // Цветовые схемы для темной темы
  const darkColorSchemes: { [key: number]: ColorScheme } = {
    1: {
      color1: new THREE.Vector3(0.945, 0.353, 0.133), // F15A22 - Orange
      color2: new THREE.Vector3(0.039, 0.055, 0.153)  // 0a0e27 - Navy Blue
    },
    2: {
      color1: new THREE.Vector3(1.0, 0.424, 0.314), // FF6C50 - Coral Red-Orange
      color2: new THREE.Vector3(0.251, 0.878, 0.816)  // 40E0D0 - Turquoise
    },
    3: {
      color1: new THREE.Vector3(0.945, 0.353, 0.133), // F15A22 - Orange
      color2: new THREE.Vector3(0.039, 0.055, 0.153), // 0a0e27 - Navy Blue
      color3: new THREE.Vector3(0.251, 0.878, 0.816)  // 40E0D0 - Turquoise
    }
  };

  // Цветовые схемы для светлой темы
  const lightColorSchemes: { [key: number]: ColorScheme } = {
    1: {
      color1: new THREE.Vector3(0.945, 0.353, 0.133), // F15A22 - Orange
      color2: new THREE.Vector3(0.953, 0.949, 0.933)  // #F3F2ED - Light cream
    },
    2: {
      color1: new THREE.Vector3(0.945, 0.353, 0.133), // F15A22 - Orange
      color2: new THREE.Vector3(0.878, 0.922, 0.929)  // #E0EBEB - Light gray
    },
    3: {
      color1: new THREE.Vector3(0.945, 0.353, 0.133), // F15A22 - Orange
      color2: new THREE.Vector3(0.953, 0.949, 0.933), // #F3F2ED - Light cream
      color3: new THREE.Vector3(0.878, 0.922, 0.929)  // #E0EBEB - Light gray
    }
  };

  // Выбираем схемы в зависимости от темы
  const colorSchemes = theme === 'dark' ? darkColorSchemes : lightColorSchemes;
  const backgroundColor = theme === 'dark' ? 0x0a0e27 : 0xF3F2ED;

  useEffect(() => {
    if (!containerRef.current) {
      console.log('LiquidGradient: Container ref is null');
      return;
    }

    console.log('LiquidGradient: Starting initialization...');

    try {
      // Initialize Three.js
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(backgroundColor);
      sceneRef.current = scene;
      console.log('LiquidGradient: Scene created with background', backgroundColor.toString(16));

      const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
      camera.position.z = 50;
      cameraRef.current = camera;
      console.log('LiquidGradient: Camera created');

      const renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        powerPreference: 'high-performance',
        alpha: false,
        stencil: false,
        depth: false 
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      rendererRef.current = renderer;
      console.log('LiquidGradient: Renderer created');

      containerRef.current.appendChild(renderer.domElement);
      console.log('LiquidGradient: Renderer appended to DOM');

      const clock = new THREE.Clock();
      clockRef.current = clock;
      console.log('LiquidGradient: Clock created');

      const touchTexture = new TouchTexture();
      touchTextureRef.current = touchTexture;
      console.log('LiquidGradient: TouchTexture created');

      const gradientBackground = new GradientBackground(scene);
      gradientBackgroundRef.current = gradientBackground;
      gradientBackground.uniforms.uTouchTexture.value = touchTexture.texture;
      gradientBackground.uniforms.uIntensity.value = intensity;
      gradientBackground.uniforms.uSpeed.value = speed;
      console.log('LiquidGradient: GradientBackground created');

      // Apply color scheme
      const colors = colorSchemes[colorScheme] || colorSchemes[1];
      gradientBackground.uniforms.uColor1.value.copy(colors.color1);
      gradientBackground.uniforms.uColor2.value.copy(colors.color2);
      if (colors.color3) {
        gradientBackground.uniforms.uColor3.value.copy(colors.color3);
      }
      console.log('LiquidGradient: Color scheme applied');

      // Animation loop
      const animate = () => {
        const delta = clock.getDelta();
        const clampedDelta = Math.min(delta, 0.1);
        
        touchTexture.update();
        gradientBackground.update(clampedDelta);
        
        renderer.render(scene, camera);
        animationIdRef.current = requestAnimationFrame(animate);
      };

      animate();
      console.log('LiquidGradient: Animation started');
      setIsInitialized(true);

      // Event listeners
      const handleMouseMove = (ev: MouseEvent) => {
        const mouse = {
          x: ev.clientX / window.innerWidth,
          y: 1 - ev.clientY / window.innerHeight
        };
        touchTexture.addTouch(mouse);
      };

      const handleTouchMove = (ev: TouchEvent) => {
        const touch = ev.touches[0];
        const mouse = {
          x: touch.clientX / window.innerWidth,
          y: 1 - touch.clientY / window.innerHeight
        };
        touchTexture.addTouch(mouse);
      };

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        gradientBackground.onResize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('resize', handleResize);

      return () => {
        console.log('LiquidGradient: Cleanup started');
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('resize', handleResize);
        
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
        }
        
        if (containerRef.current && renderer.domElement) {
          containerRef.current.removeChild(renderer.domElement);
        }
        
        renderer.dispose();
        console.log('LiquidGradient: Cleanup completed');
      };
    } catch (error) {
      console.error('LiquidGradient: Initialization failed', error);
    }
  }, [colorScheme, intensity, speed, theme]);

  return (
    <div 
      ref={containerRef} 
      className={`fixed inset-0 w-full h-full pointer-events-none ${className || ''}`}
      style={{ 
        zIndex: -1, // Настоящий фон, ниже всех интерактивных элементов
        background: isInitialized ? 'transparent' : (theme === 'dark' ? '#0a0e27' : '#F3F2ED') // Fallback color
      }}
    />
  );
}
