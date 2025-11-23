import { useEffect, useRef } from "react";

export default function ARScene() {
  const sceneRef = useRef(null);

  useEffect(() => {
    window.debugLog("React component mounted");
    window.debugLog("User Agent: " + navigator.userAgent);
    
    // Check for HTTPS
    if (window.location.protocol !== "https:" && window.location.hostname !== "localhost") {
      window.debugLog("WARNING: Not on HTTPS! Camera may not work.");
    }
    
    const scene = sceneRef.current;
    if (!scene) {
      window.debugLog("ERROR: Scene ref not found");
      return;
    }

    window.debugLog("Scene element found, setting up listeners...");

    // Handle MindAR events
    scene.addEventListener("arReady", () => {
      window.debugLog("✓ AR Ready");
    });

    scene.addEventListener("arError", (event) => {
      window.debugLog("✗ AR Error: " + JSON.stringify(event.detail));
    });

    // Request camera permission explicitly on mobile
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      window.debugLog("Mobile device detected, requesting camera...");
      
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then(() => {
          window.debugLog("✓ Camera permission granted");
        })
        .catch((err) => {
          window.debugLog("✗ Camera permission denied: " + err.message);
        });
    }

    return () => {
      window.debugLog("Component unmounting");
    };
  }, []);

  return (
    <>
      <a-scene
        ref={sceneRef}
        mindar-image="imageTargetSrc: ./targets.mind; autoStart: true; uiLoading: no; uiError: no; uiScanning: no;"
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

      <div
        id="debug-log"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "120px",
          background: "rgba(0,0,0,0.8)",
          color: "lime",
          fontSize: "12px",
          padding: "10px",
          overflowY: "scroll",
          zIndex: 9999,
          fontFamily: "monospace",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      ></div>
    </>
  );
}
