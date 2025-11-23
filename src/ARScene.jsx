export default function ARScene() {
  useEffect(() => {
  const log = (msg) => {
    const el = document.getElementById("debug-log");
    el.innerText += msg + "\n";
  };

  // Camera error capture
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(() => log("Camera OK"))
    .catch((err) => log("Camera Error: " + err.name + " - " + err.message));

  window.onerror = function (msg, url, line) {
    log("JS Error: " + msg + " @ " + line);
  };
}, []);

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
        ></a-text>

        <a-box
          color="yellow"
          position="0 -0.3 0"
          scale="0.3 0.3 0.3"
        ></a-box>
      </a-entity>
    </a-scene>

    {/* Debug log box */}
    <div
      id="debug-log"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        maxHeight: "180px",
        background: "rgba(0, 0, 0, 0.85)",
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
