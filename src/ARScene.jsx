import { useEffect, useState } from "react";

export default function ARScene() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const loadScript = (src) =>
      new Promise((resolve) => {
        const s = document.createElement("script");
        s.src = src;
        s.onload = resolve;
        document.body.appendChild(s);
      });

    const loadCSS = (href) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    };

    async function init() {
      // Load A-Frame and MindAR
      loadCSS("https://cdn.jsdelivr.net/npm/mind-ar@1.1.5/dist/mindar-image.prod.css");

      await loadScript("https://aframe.io/releases/1.5.0/aframe.min.js");
      await loadScript("https://cdn.jsdelivr.net/npm/mind-ar@1.1.5/dist/mindar-image.prod.js");

      setReady(true);
    }

    init();
  }, []);

  if (!ready)
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading AR...</h2>;

  return (
    <>
      <a-scene
        mindar-image="imageTargetSrc: /targets.mind"
        color-space="sRGB"
        embedded
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
        renderer="colorManagement: true, physicallyCorrectLights"
      >
        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

        <a-entity mindar-image-target="targetIndex: 0">
          <a-text
            value="Healthy Plant!"
            color="green"
            position="0 0.3 0"
            scale="0.5 0.5 0.5"
          />
          <a-box
            color="yellow"
            position="0 -0.3 0"
            scale="0.3 0.3 0.3"
          />
        </a-entity>
      </a-scene>

      {/* Debug section */}
      <div
        id="debug-log"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          maxHeight: "180px",
          background: "rgba(0,0,0,0.85)",
          color: "#00ff00",
          fontSize: "12px",
          padding: "10px",
          overflowY: "scroll",
          zIndex: 9999
        }}
      ></div>
    </>
  );
}
