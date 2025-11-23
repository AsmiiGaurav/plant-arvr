import { useState } from "react";

export default function ARScene() {
  const [started, setStarted] = useState(false);

  const startAR = () => {
    setStarted(true);
  };

  if (!started) {
    return (
      <div style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#111",
        color: "white",
        flexDirection: "column"
      }}>
        <h2>Plant AR</h2>
        <button
          onClick={startAR}
          style={{
            padding: "12px 24px",
            fontSize: "18px",
            borderRadius: "8px",
            border: "none",
            background: "#4CAF50",
            color: "white"
          }}
        >
          Start Camera
        </button>
      </div>
    );
  }

  return (
    <>
      <a-scene
        mindar-image="imageTargetSrc: /targets.mind"
        color-space="sRGB"
        embedded
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
      >
        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

        <a-entity mindar-image-target="targetIndex: 0">
          <a-text
            value="Healthy Plant!"
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
      </a-scene>
    </>
  );
}
