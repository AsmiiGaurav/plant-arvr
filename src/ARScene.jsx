import { useEffect, useRef, useState } from "react";

export default function ARScene() {
  const sceneRef = useRef(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState(null);

  useEffect(() => {
    window.debugLog("✓ React component mounted");
    window.debugLog("User Agent: " + navigator.userAgent);
    window.debugLog("Protocol: " + window.location.protocol);
    window.debugLog("Hostname: " + window.location.hostname);
    
    // Check for HTTPS
    if (window.location.protocol !== "https:" && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
      window.debugLog("⚠ WARNING: Not on HTTPS! Camera requires HTTPS on mobile devices.");
    }

    // Check if mediaDevices is available
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      const error = "MediaDevices API not available. Browser may not support camera access.";
      window.debugLog("✗ " + error);
      setCameraError(error);
      setCameraReady(true);
      return;
    }

    // Request camera permission
    window.debugLog("Requesting camera permission...");
    window.debugLog("→ If you see a permission prompt, please click 'Allow'");
    
    navigator.mediaDevices
      .getUserMedia({ 
        video: { 
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      })
      .then((stream) => {
        window.debugLog("✓ Camera permission GRANTED!");
        // Stop the test stream
        stream.getTracks().forEach(track => track.stop());
        setCameraReady(true);
      })
      .catch((err) => {
        let errorMsg = "Camera access denied: " + err.name;
        
        if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
          errorMsg = "Camera permission denied by user. Please allow camera access in browser settings.";
        } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
          errorMsg = "No camera found on this device.";
        } else if (err.name === "NotReadableError" || err.name === "TrackStartError") {
          errorMsg = "Camera is already in use by another application.";
        } else if (err.name === "OverconstrainedError") {
          errorMsg = "Camera doesn't support the requested constraints.";
        } else if (err.name === "SecurityError") {
          errorMsg = "Camera access blocked for security reasons. Check HTTPS/localhost.";
        } else {
          errorMsg += " - " + err.message;
        }
        
        window.debugLog("✗ " + errorMsg);
        setCameraError(errorMsg);
        
        // Continue anyway to initialize AR (will show error overlay)
        setCameraReady(true);
      });

    return () => {
      window.debugLog("Component unmounting");
    };
  }, []);

  useEffect(() => {
    if (!cameraReady) return;

    const scene = sceneRef.current;
    if (!scene) {
      window.debugLog("ERROR: Scene ref not found");
      return;
    }

    window.debugLog("Setting up AR scene listeners...");

    // Handle MindAR events
    const handleArReady = () => {
      window.debugLog("✓ AR system ready!");
    };

    const handleArError = (event) => {
      window.debugLog("✗ AR Error: " + JSON.stringify(event.detail));
    };

    scene.addEventListener("arReady", handleArReady);
    scene.addEventListener("arError", handleArError);

    return () => {
      scene.removeEventListener("arReady", handleArReady);
      scene.removeEventListener("arError", handleArError);
    };
  }, [cameraReady]);

  return (
    <>
      <a-scene
        ref={sceneRef}
        mindar-image="imageTargetSrc: /targets.mind; autoStart: true; uiLoading: no; uiError: no; uiScanning: no;"
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
