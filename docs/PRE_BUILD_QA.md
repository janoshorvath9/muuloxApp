# Pre-build QA checklist (before Play upload)

Run after `eas build --profile preview --platform android` or local dev client.

## Splash

- [ ] Cold start: pale teal background (`#F3FBFC`), MUULOX logo centered
- [ ] No long white flash before home screen
- [ ] Android 12+: splash matches adaptive icon background

## Legal links (home footer)

- [ ] **Privacy** opens `https://muulox.com/aplicatie-mobila/confidentialitate/` (or hub until CMS live)
- [ ] **Terms** opens `https://muulox.com/aplicatie-mobila/termeni/`
- [ ] Links work in EN, HU, RO UI

## Core flows

- [ ] Shop opens muulox.com in WebView
- [ ] Portal opens demo/production portal URL
- [ ] Android back: WebView history then home
- [ ] Reload and home floating buttons work
- [ ] Language switcher cycles en → hu → ro

## CMS (your side, before production listing)

- [ ] Publish `docs/legal/` pages on muulox.com (see `docs/legal/README.md`)
- [ ] Play Console privacy URL set
- [ ] Data safety form filled (`docs/legal/DATA_SAFETY_PLAY_CONSOLE.md`)

## Production build (you)

```bash
eas login
eas build --platform android --profile production
```

Upload `.aab` to Play Console when above checks pass.
