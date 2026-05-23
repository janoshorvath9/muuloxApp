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

| Field | Recommended URL |
|-------|-----------------|
| Privacy policy | `https://muulox.com/aplicatie-mobila/` or `https://muulox.com/aplicatie-mobila/confidentialitate/` |
| Data safety answers | See `DATA_SAFETY_PLAY_CONSOLE.md` |

## In-app links

After pages are live, the app opens these URLs from `constants/urls.ts` (`LEGAL.appPrivacy`, `LEGAL.appTerms`).

## Checklist

- [ ] Create hub page with links to GDPR, website terms, app addendum, app terms
- [ ] Publish RO (and optionally EN/HU) addendum and app terms
- [ ] Verify all internal links return 200
- [ ] Set Play Console privacy policy URL
- [ ] Complete Data safety form using cheat sheet
- [ ] Test legal links from the app on a device build
