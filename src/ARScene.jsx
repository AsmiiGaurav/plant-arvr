import { useState } from "react";

export default function ARScene() {
  const [started, setStarted] = useState(false);

  const startAR = () => {
    setStarted(true);
  };

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
        }}
      >
        <h2>Plant AR</h2>
        <button
          onClick={startAR}
          style={{
            padding: "12px 24px",
            fontSize: "18px",
            borderRadius: "8px",
            border: "none",
            background: "#4CAF50",
            color: "white",
          }}
        >
          Start Camera
        </button>
      </div>
    );
  }

  // --- AR Scene ---
  return (
    <>
      <a-scene
        mindar-image="imageTargetSrc: /targets.mind"
        color-space="sRGB"
        embedded
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
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
