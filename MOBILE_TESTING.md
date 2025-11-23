# 📱 Mobile Testing - Camera Fix

## 🚨 THE PROBLEM

**Mobile browsers (Chrome, Safari, etc.) REQUIRE HTTPS for camera access.**

- ❌ `http://192.168.1.x:5174` - Camera BLOCKED
- ❌ `http://your-local-ip:5174` - Camera BLOCKED  
- ✅ `https://your-tunnel.ngrok.io` - Camera WORKS
- ✅ `https://your-app.vercel.app` - Camera WORKS

## ✅ SOLUTION: Use HTTPS Tunnel or Deploy

### Option 1: ngrok (Recommended - Easiest)

**Step 1: Install ngrok**
```bash
npm install -g ngrok
```

**Step 2: Start your dev server**
```bash
npm run dev
# Note the port (usually 5174)
```

**Step 3: Create HTTPS tunnel**
```bash
ngrok http 5174
```

**Step 4: Use the HTTPS URL on your phone**
```
✓ Copy the https:// URL from ngrok
✓ Open it on your phone's Chrome
✓ Camera will now work! 🎉
```

Example output:
```
Forwarding  https://abc123.ngrok.io -> http://localhost:5174
```

### Option 2: Cloudflare Tunnel (Alternative)

**Start tunnel:**
```bash
npx cloudflared tunnel --url localhost:5174
```

**Use the provided HTTPS URL on your phone.**

### Option 3: Deploy to Vercel (Best for Production)

**One-time setup:**
```bash
npm install -g vercel
vercel login
```

**Deploy:**
```bash
vercel
```

You'll get an HTTPS URL like: `https://plant-arvr.vercel.app`

## 📱 Testing Steps

1. **Start tunnel** (ngrok or cloudflare)
2. **Copy HTTPS URL**
3. **Open on phone** in Chrome
4. **Allow camera** when prompted
5. **Test AR scanning** with plant images

## 🔍 Verify It's Working

You should see in the app:
```
✓ React component mounted
✓ Camera permission GRANTED!  
✓ AR system ready!
```

And the camera video feed should be visible.

## ⚠️ Common Mobile Issues

### Issue 1: "Media devices not available"
- **Cause**: Not using HTTPS
- **Fix**: Use ngrok/cloudflare tunnel or deploy to Vercel

### Issue 2: Camera permission denied
- **Cause**: User clicked "Block" 
- **Fix**: Clear site data in Chrome settings, reload

### Issue 3: Black screen after clicking "Start Camera"
- **Cause**: MindAR initialization issue
- **Fix**: Check console for errors, ensure targets.mind loaded

### Issue 4: Video shows but AR doesn't track
- **Cause**: Poor lighting or wrong target
- **Fix**: Use well-lit environment, print target images

## 🎯 Quick Test Commands

**Terminal 1 - Dev Server:**
```bash
npm run dev
```

**Terminal 2 - ngrok:**
```bash
ngrok http 5174
```

**Phone - Chrome:**
```
Open the https:// URL from ngrok
```

## 📊 Expected Behavior on Mobile

1. **Start Screen**: Shows "Start Camera" button
2. **Permission Prompt**: Chrome asks for camera access
3. **Click Allow**: Camera initializes
4. **Video Feed**: See your phone's camera view
5. **AR Ready**: Scanner overlay appears
6. **Point at Target**: 3D content appears when plant detected

## 🚀 Production Deployment

For permanent HTTPS without tunnels:

**Deploy to Vercel:**
```bash
vercel --prod
```

Your app will be live at: `https://your-app.vercel.app`

- ✅ Always HTTPS
- ✅ Fast global CDN
- ✅ Automatic SSL certificates
- ✅ No configuration needed

## 💡 Pro Tips

1. **Save ngrok URL**: It changes each time unless you use paid plan
2. **Test on multiple devices**: iOS Safari behaves differently than Android Chrome
3. **Use good lighting**: AR tracking needs clear images
4. **Print targets**: Use actual photos/prints for better detection
5. **Check console**: F12 on desktop to remote debug mobile

## 🆘 Still Not Working?

**Debug on mobile:**
1. Open Chrome on desktop
2. Connect phone via USB
3. Go to `chrome://inspect`
4. Inspect your phone's browser tab
5. Check console for errors

**Common console errors:**
- "NotAllowedError" → Camera permission denied
- "NotFoundError" → No camera on device  
- "SecurityError" → Not using HTTPS

## ✅ Checklist

- [ ] Dev server running (`npm run dev`)
- [ ] ngrok/tunnel running
- [ ] Using HTTPS URL (not HTTP)
- [ ] Accessing from mobile Chrome
- [ ] Camera permission allowed
- [ ] Good lighting for testing
- [ ] Target images ready to scan

