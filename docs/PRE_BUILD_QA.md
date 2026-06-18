# Pre-build QA checklist (before Play upload)

Run after `eas build --profile preview --platform android` or local dev client.

This app is a **WebView wrapper** for MUULOX web services (`muulox.com`, portal hosts). Native code does not replace the website login, checkout, or GDPR processing.

## Splash

- [ ] Cold start: pale teal background (`#F3FBFC`), MUULOX logo centered
- [ ] No long white flash before home screen
- [ ] Android 12+: splash matches adaptive icon background

## Legal (home footer)

- [ ] **Privacy** opens the in-app privacy policy screen (EN / HU / RO)
- [ ] **Terms** opens the in-app terms screen (EN / HU / RO)
- [ ] Back returns to home from both screens

## Core flows

- [ ] Shop opens `https://muulox.com/` in WebView
- [ ] Portal opens `https://muuloxerp.ro/` in WebView
- [ ] On fresh install: camera and photo/library permission dialogs appear after splash
- [ ] Portal WebView: file upload and camera capture work when the portal page requests them
- [ ] Android back: WebView history then home
- [ ] Reload and home floating buttons work
- [ ] Language switcher cycles en → hu → ro

## Google Play Console (before production listing)

- [ ] **Privacy policy URL** set to **`https://muulox.com/gdpr/`** (same URL in store listing text and Data safety)
- [ ] Data safety form filled (`docs/legal/DATA_SAFETY_PLAY_CONSOLE.md`)
- [ ] Store listing uses the same privacy URL as Play Console (see `docs/store-listing/full-description.*.md`)

Optional later: publish app-specific CMS pages from `docs/legal/` (`/aplicatie-mobila/...`). Not required for launch if Play uses the GDPR page above.

## Production build (you)

```bash
eas login
eas build --platform android --profile production
```

Upload `.aab` to Play Console when above checks pass.
