'use client'

import createGlobe from 'cobe';

import React, { useEffect, useRef } from 'react';

function Globe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef?.current) return;
    const globe = createGlobe(canvasRef?.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [1, 1, 1],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [
        // longitude latitude
        { location: [40.7128, -74.006], size: 0.1 },
        // 新加坡
        { location: [1.3521, 103.8198], size: 0.05 },
        // 上海
        { location: [31.2304, 121.4737], size: 0.05 },
        // 东京
        { location: [35.6895, 139.6917], size: 0.05 },
        // 香港
        { location: [22.3193, 114.1694], size: 0.05 },
        // 洛杉矶
        { location: [34.0522, -118.2437], size: 0.05 },
        // 悉尼
        { location: [-33.8688, 151.2093], size: 0.05 },
        // 伦敦
        { location: [51.5074, -0.1278], size: 0.05 },
        // 沙特
        { location: [24.7136, 46.6753], size: 0.05 },
        // 莫斯科
        { location: [55.7558, 37.6176], size: 0.05 },
        // 里约热内卢
        { location: [-22.9068, -43.1729], size: 0.05 },
        // 开罗
        { location: [30.0444, 31.2357], size: 0.05 },
        // 约翰内斯堡
        { location: [-26.2041, 28.0473], size: 0.05 },
        // 孟买
        { location: [19.076, 72.8777], size: 0.05 },
      ],
      scale: 0.7,
      opacity: 0.1,
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi;
        phi += 0.01;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div className="App">
      <canvas
        ref={canvasRef}
        style={{ width: 600, height: 600, maxWidth: '100%', aspectRatio: 1 }}
      />
    </div>
  );
}

export default Globe;
