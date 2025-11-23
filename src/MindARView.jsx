import { useEffect } from "react";

export default function MindARView() {
  useEffect(() => {
    // nothing required here now
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <a-scene
        mindar-image="imageTargetSrc: ./targets.mind;"
        color-space="sRGB"
        renderer="colorManagement: true; physicallyCorrectLights"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
        embedded
      >
        {/* Camera */}
        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

        {/* AR Content */}
        <a-entity mindar-image-target="targetIndex: 0">
          <a-box
            position="0 0 0"
            depth="0.2"
            height="0.2"
            width="0.2"
            color="green"
          ></a-box>
        </a-entity>
      </a-scene>
    </div>
  );
}
