export default function ARScene() {
  return (
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
  );
}
