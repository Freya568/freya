"use client";

import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
uniform vec2 uResolution;
uniform float uTime;
uniform float uTop;
uniform float uBottom;

void main() {
  float y = 1.0 - gl_FragCoord.y / uResolution.y;
  float wave = sin(gl_FragCoord.x / uResolution.x * 6.28318 + uTime * 0.12) * 0.035;
  float enter = smoothstep(uTop - 0.28 + wave, uTop + 0.04 + wave, y);
  float leave = smoothstep(uBottom - 0.04 + wave, uBottom + 0.28 + wave, y);
  float inkAmt = clamp(enter * (1.0 - leave), 0.0, 1.0);
  vec3 cream = vec3(0.973, 0.965, 0.953);
  vec3 ink = vec3(0.055, 0.031, 0.027);
  gl_FragColor = vec4(mix(cream, ink, inkAmt), 1.0);
}
`;

export function SiteGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return;

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const vertex = compile(gl.VERTEX_SHADER, VERT);
    const fragment = compile(gl.FRAGMENT_SHADER, FRAG);
    const program = gl.createProgram();
    if (!vertex || !fragment || !program) return;

    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.bindAttribLocation(program, 0, "aPos");
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, "uResolution");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uTop = gl.getUniformLocation(program, "uTop");
    const uBottom = gl.getUniformLocation(program, "uBottom");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let running = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(window.innerWidth * dpr));
      const height = Math.max(1, Math.round(window.innerHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const bandSpan = () => {
      const band = document.querySelector<HTMLElement>("[data-gradient-band]");
      if (!band) return { top: 2, bottom: 2 };
      const view = window.innerHeight || 1;
      const rect = band.getBoundingClientRect();
      return { top: rect.top / view, bottom: rect.bottom / view };
    };

    const draw = (now: number) => {
      if (!running) return;
      frame = window.requestAnimationFrame(draw);
      resize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      const span = bandSpan();
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uTime, reduce ? 0 : now * 0.001);
      gl.uniform1f(uTop, span.top);
      gl.uniform1f(uBottom, span.bottom);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    frame = window.requestAnimationFrame(draw);

    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
      }}
    />
  );
}
