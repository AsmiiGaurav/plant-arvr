# Camera Setup & Troubleshooting Guide

## ✅ Fixes Applied

All 4 critical issues have been fixed:

1. **Script Loading Order** ✓
   - Moved error handler after React mount
   - Created global `window.debugLog()` function
   - Updated to MindAR 1.2.5 with A-Frame integration

2. **React Component Mounting** ✓
   - Added proper debug logging in ARScene.jsx
   - Component lifecycle tracking working

3. **Mobile Browser Rules** ✓
   - Added mobile meta tags for camera permissions
   - Implemented early camera permission request
   - Fixed viewport settings for mobile

4. **Vercel Deployment** ✓
   - Created vercel.json with camera headers
   - Configured relative paths for deployment
   - HTTPS-ready configuration

## 🎥 Camera Not Working? Follow These Steps

### Step 1: Check Browser Permissions

The camera requires explicit permission from your browser.

#### Chrome/Edge:
1. Look for camera icon in address bar (left side)
2. Click it and select "Allow"
3. Refresh the page
4. If no icon appears:
   - Go to `chrome://settings/content/camera`
   - Find your site in "Blocked" list
   - Move it to "Allowed" or remove from blocked

#### Firefox:
1. Click the lock/info icon in address bar
2. Find "Permissions" section
3. Set Camera to "Allow"
4. Refresh the page

#### Safari:
1. Safari menu → Settings → Websites → Camera
2. Find your localhost site
3. Set to "Allow"

### Step 2: Verify Camera Access

Open browser console (F12) and run:
```javascript
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    console.log("✓ Camera works!");
    stream.getTracks().forEach(t => t.stop());
  })
  .catch(err => console.error("✗ Camera error:", err));
```

### Step 3: Check Debug Console

The app shows a green debug console at the bottom of the screen with:
- ✓ Success messages (camera granted, AR ready)
- ✗ Error messages (what went wrong)
- → Instructions (what to do next)

### Step 4: Common Issues & Solutions

**Issue: "NotAllowedError" or "PermissionDeniedError"**
- **Solution**: You clicked "Block" on the permission prompt
- **Fix**: Follow Step 1 to allow camera in browser settings

**Issue: "NotFoundError" or "DevicesNotFoundError"**
- **Solution**: No camera detected on your device
- **Fix**: Connect a webcam or test on a device with a camera

**Issue: "NotReadableError" or "TrackStartError"**
- **Solution**: Camera is being used by another app
- **Fix**: Close other apps using the camera (Zoom, Teams, etc.)

**Issue: "SecurityError"**
- **Solution**: Site not on HTTPS or localhost
- **Fix**: 
  - For local dev: Access via `localhost` not `127.0.0.1`
  - For production: Deploy to Vercel (automatic HTTPS)

## 🚀 Testing Locally

### Desktop Testing:
```bash
npm run dev
```
Then open: `http://localhost:5174`

**Important**: Use `localhost`, NOT `127.0.0.1` or your IP address for camera permissions to work properly.

### Mobile Testing (Requires HTTPS):

Option 1: **Using ngrok** (Recommended)
```bash
# Install ngrok
npm install -g ngrok

# Start dev server
npm run dev

# In another terminal, tunnel it
ngrok http 5174
```
Then use the HTTPS URL provided by ngrok on your mobile device.

Option 2: **Using Cloudflare Tunnel**
```bash
npx cloudflared tunnel --url localhost:5174
```

## 📱 Production Deployment (Vercel)

Camera REQUIRES HTTPS on mobile devices. Deploy to Vercel for automatic HTTPS:

### Quick Deploy:
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Or via GitHub:
1. Push code to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Deploy automatically!

Vercel provides:
- ✓ Automatic HTTPS
- ✓ Proper camera permission headers
- ✓ Global CDN
- ✓ Auto-deployments on push

## 🔍 Debug Checklist

Before asking for help, verify:

- [ ] Page is accessed via `localhost` or `HTTPS` (not `127.0.0.1`)
- [ ] Camera permission is set to "Allow" in browser
- [ ] No other apps are using the camera
- [ ] Browser supports getUserMedia (check caniuse.com)
- [ ] Debug console shows what error is occurring
- [ ] targets.mind file loads successfully (check Network tab)

## 📊 Expected Console Output (Success)

```
✓ React component mounted
✓ Camera permission GRANTED!
→ Setting up AR scene listeners...
✓ AR system ready!
```

## ❌ If Still Not Working

1. **Check browser console (F12)**:
   - Look for red errors
   - Check Network tab for 404s
   - Verify targets.mind loads

2. **Try different browser**:
   - Chrome usually has best WebRTC support
   - Firefox is second best
   - Safari can be tricky

3. **Test camera elsewhere**:
   - Visit https://www.onlinemictest.com/webcam-test/
   - Verify camera works in other apps

4. **Review debug console output**:
   - Screenshot the green debug console
   - Share the error messages

## 📝 Files Modified

All fixes are in these files:
- `index.html` - Script order, meta tags, debug logger
- `src/ARScene.jsx` - Camera handling, error messages
- `vite.config.js` - Build configuration
- `vercel.json` - Deployment settings

## 🎯 Next Steps

1. **Local Testing**: Follow Steps 1-3 above
2. **Mobile Testing**: Use ngrok or Cloudflare tunnel
3. **Production**: Deploy to Vercel
4. **Celebrate**: Your AR app is running! 🎉
