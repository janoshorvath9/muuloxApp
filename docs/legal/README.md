# MUULOX mobile app — legal documents

These files are **CMS source** for pages on [muulox.com](https://muulox.com). The website remains the source of truth for GDPR and commerce terms.

## Publish on WordPress / CMS

Create the following pages (suggested slugs). Paste content from the matching `.md` file (convert to HTML in CMS or use a markdown block).

| Page | Suggested URL | Source file |
|------|---------------|-------------|
| App legal hub | `https://muulox.com/aplicatie-mobila/` | `app-legal-hub.html` |
| App privacy addendum | `https://muulox.com/aplicatie-mobila/confidentialitate/` | `app-privacy-addendum.ro.md` (primary), en/hu optional |
| App terms of use | `https://muulox.com/aplicatie-mobila/termeni/` | `app-terms-of-use.ro.md` (primary), en/hu optional |

**Before publish:** replace `[ADD DATE]` / `[COMPLETAȚI DATA]` / `[DÁTUM MEGADÁSA]` with the effective date.

## Existing website policies (do not duplicate)

- Privacy / GDPR: https://muulox.com/gdpr/
- Website terms: https://muulox.com/termeni-si-conditii/

## Google Play Console

| Field | URL for launch |
|-------|----------------|
| Privacy policy | **`https://muulox.com/gdpr/`** (must match store listing and `DATA_SAFETY_PLAY_CONSOLE.md`) |
| Data safety answers | See `DATA_SAFETY_PLAY_CONSOLE.md` |

## In-app legal

The app shows bundled Privacy and Terms screens from the home footer (EN / HU / RO). That is separate from the Play Console privacy policy URL above.

Optional CMS URLs in `constants/urls.ts` (`LEGAL.*`) are for future website pages, not required for Play if GDPR is the store policy link.

## Checklist

- [ ] Set Play Console privacy policy to **`https://muulox.com/gdpr/`**
- [ ] Complete Data safety form using cheat sheet
- [ ] Test in-app Privacy / Terms on a device build (EN, HU, RO)
- [ ] (Optional) Create hub page and publish app addendum / app terms under `/aplicatie-mobila/...`
