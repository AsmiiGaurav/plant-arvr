# Plant AR - MindAR Image Tracking

An AR application using MindAR for image tracking with React and A-Frame.

## 🔧 Recent Fixes

### 1. Script Loading Order ✅
- Moved error handler AFTER React mount to ensure debug-log div exists
- Created global `window.debugLog()` function that gracefully handles missing elements
- Updated to MindAR 1.2.5 with proper A-Frame integration

### 2. React Component Mounting ✅
- Added `useEffect` hook to log when React components mount
- Debug logs now appear in the on-screen console
- Added event listeners for AR lifecycle events (arReady, arError)

### 3. Mobile Browser Compatibility ✅
- Added mobile-specific meta tags for camera permissions
- Added explicit camera permission request for mobile devices
- Updated viewport settings to prevent scaling issues
- Fixed path to `targets.mind` using relative path (`./targets.mind`)

### 4. Vercel Deployment ✅
- Created `vercel.json` with proper camera permissions headers
- Set `base: './'` in vite.config for relative paths
- Configured SPA routing with rewrites
- Ready for HTTPS deployment (required for camera access)

## 🚀 Quick Start

### Development
```bash
npm install
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📱 Mobile Testing

**IMPORTANT**: AR features require HTTPS on mobile devices!

### Local Mobile Testing
1. Run dev server: `npm run dev`
2. Get your local IP (shown in terminal)
3. Access from mobile: `http://[YOUR_IP]:5173`
4. For camera to work, you may need to use a tunnel service like:
   - ngrok: `npx ngrok http 5173`
   - Cloudflare Tunnel: `npx cloudflared tunnel --url localhost:5173`

### Production Deployment (Vercel - Recommended)

1. Push to GitHub repository
2. Import to Vercel (automatic HTTPS)
3. Deploy!

Vercel automatically:
- Serves via HTTPS (required for camera)
- Sets correct camera permission headers
- Builds and deploys on every push

## 🐛 Debug Console

The app includes an on-screen debug console at the bottom showing:
- React component mount status
- User agent information
- HTTPS status warnings
- Camera permission status
- AR initialization events
- Any errors that occur

## 📂 Project Structure

```
plant-arvr/
├── index.html              # Entry point with A-Frame/MindAR scripts
├── src/
│   ├── main.jsx           # React entry
│   ├── App.jsx            # Root component
│   └── ARScene.jsx        # Main AR scene with debug logging
├── public/
│   ├── targets.mind       # MindAR compiled target
│   └── plant.webp         # Target image reference
├── vite.config.js         # Vite config with .mind support
└── vercel.json            # Vercel deployment config
```

## 🎯 How It Works

1. **A-Frame + MindAR** load in `index.html` BEFORE React
2. **React** mounts and creates the debug console
3. **ARScene component** initializes with:
   - Camera permission request
   - AR event listeners
   - Debug logging
4. **MindAR** starts tracking using `targets.mind`
5. When target is detected, 3D content appears!

## 🔒 Camera Permissions

The app requests camera access on mount. On mobile:
- First visit: Browser shows permission prompt
- Allow camera access for AR to work
- If denied, check browser settings to allow camera

## 📸 Creating New Targets

To create your own image targets:
1. Visit https://hiukim.github.io/mind-ar-js-doc/tools/compile
2. Upload your target image(s)
3. Download the compiled `.mind` file
4. Replace `public/targets.mind`

## 🆘 Troubleshooting

**Camera not starting on mobile?**
- ✅ Check HTTPS (required on mobile)
- ✅ Check browser camera permissions
- ✅ Check debug console for specific errors

**Target not detected?**
- Ensure good lighting
- Keep target image flat and visible
- Try different distances/angles
- Check that targets.mind matches your image

**Debug logs not showing?**
- Check browser console (F12)
- Logs appear both on-screen and in console

## 📦 Dependencies

- React 18
- Vite
- A-Frame 1.5.0
- MindAR 1.2.5

## 📄 License

MIT
