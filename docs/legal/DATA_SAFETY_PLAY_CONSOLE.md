# Google Play — Data safety form (cheat sheet)

Use this when completing **App content → Data safety** for the MUULOX wrapper app. Answers reflect the current codebase (no analytics SDK, WebView to muulox.com).

## Summary for reviewers

- **Native app:** Thin shell (home screen, language picker, WebView). Does not collect account or payment data in native code.
- **Websites in WebView:** When users log in or order on `muulox.com` / portal hosts, processing is described at https://muulox.com/gdpr/

## Does your app collect or share any of the required user data types?

### Collected or shared by the **app binary** (native)

| Data type | Collected? | Shared? | Notes |
|-----------|------------|---------|-------|
| Personal info (name, email, etc.) | No | No | Collected on website when user uses WebView, not by native SDK |
| Financial info | No | No | Payments on website |
| Location | No | No | |
| Photos/videos | No | No | |
| Audio files | No | No | |
| Contacts | No | No | |
| App activity (analytics) | No | No | No Firebase/analytics in package.json |
| Web browsing history | No | No | App loads MUULOX URLs only; no general browser history collection |
| Device or other IDs | No | No | Unless added later |

If Google asks whether data is collected **through WebView / linked services**: indicate that users may provide data to MUULOX websites per https://muulox.com/gdpr/ — equivalent to using the site in a browser.

### Ephemeral / on-device only

- **Device language** — used locally for en/hu/ro UI (`expo-localization`); not transmitted to MUULOX backend by app code today.

## Security practices

- Data in transit: **Yes** — WebView loads HTTPS URLs.
- Data encrypted at rest (native): N/A for personal data not stored natively.

## Purposes (if prompted for website-linked data)

- App functionality (access to shop and portal)
- Not advertising or analytics at native layer

## Privacy policy URL

Enter in Play Console (and use in the store listing):

- **`https://muulox.com/gdpr/`**

This covers personal data when users shop or use the portal inside the WebView. Optional app addendum at `/aplicatie-mobila/confidentialitate/` is not required for launch if this URL is used everywhere.

## Account deletion

If asked: account deletion is handled per website / portal policies (GDPR rights on https://muulox.com/gdpr/), not via a separate in-app account system.

## Updates

Revisit this document if you add: crash reporting, push notifications, native login, or analytics.
