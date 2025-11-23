import { useState, useEffect } from "react";

export default function ARScene() {
  const [started, setStarted] = useState(false);

  const startAR = () => {
    console.log("Starting AR...");
    setStarted(true);
  };

  useEffect(() => {
    if (started) {
      console.log("AR Scene mounted, MindAR should initialize...");
      
      // Give MindAR time to initialize
      const timer = setTimeout(() => {
        const video = document.querySelector('video');
        if (video) {
          console.log("✓ Video element found:", video);
          console.log("Video dimensions:", video.videoWidth, "x", video.videoHeight);
          console.log("Video playing:", !video.paused);
        } else {
          console.log("✗ No video element found!");
        }
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [started]);

  // --- iOS required gesture screen ---
  if (!started) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#111",
          color: "white",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h2>Plant AR Scanner</h2>
        <p style={{ opacity: 0.7, maxWidth: "300px", textAlign: "center" }}>
          Click the button below to start the camera and begin AR scanning
        </p>
        <button
          onClick={startAR}
          style={{
            padding: "16px 32px",
            fontSize: "18px",
            borderRadius: "8px",
            border: "none",
            background: "#4CAF50",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          🎥 Start Camera
        </button>
      </div>
    );
  }

  // --- AR Scene ---
  return (
    <>
      <a-scene
        mindar-image="imageTargetSrc: /targets.mind; autoStart: true; uiLoading: no; uiError: no; uiScanning: no;"
        color-space="sRGB"
        embedded
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      >
        {/* Camera */}
        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

        {/* Target 0 */}
        <a-entity mindar-image-target="targetIndex: 0">
          <a-text
            value="Money Plant"
            color="green"
            position="0 0.3 0"
            scale="0.5 0.5 0.5"
          ></a-text>
          <a-box
            color="yellow"
            position="0 -0.3 0"
            scale="0.3 0.3 0.3"
          ></a-box>
        </a-entity>

        {/* Target 1 */}
        <a-entity mindar-image-target="targetIndex: 1">
          <a-text
            value="Plant 2 Detected"
            color="skyblue"
            position="0 0.3 0"
            scale="0.5 0.5 0.5"
          ></a-text>
          <a-sphere
            color="blue"
            radius="0.15"
            position="0 -0.3 0"
          ></a-sphere>
        </a-entity>

        {/* Target 2 */}
        <a-entity mindar-image-target="targetIndex: 2">
          <a-text
            value="Plant 3 Detected"
            color="orange"
            position="0 0.3 0"
            scale="0.5 0.5 0.5"
          ></a-text>
          <a-cylinder
            color="orange"
            height="0.3"
            radius="0.1"
            position="0 -0.3 0"
          ></a-cylinder>
        </a-entity>

        {/* Target 3 */}
        <a-entity mindar-image-target="targetIndex: 3">
          <a-text
            value="Plant 4 Detected"
            color="pink"
            position="0 0.3 0"
            scale="0.5 0.5 0.5"
          ></a-text>
          <a-box
            color="pink"
            position="0 -0.3 0"
            scale="0.25 0.25 0.25"
          ></a-box>
        </a-entity>
      </a-scene>
    </>
  );
}
