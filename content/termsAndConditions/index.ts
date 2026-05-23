import { termsAndConditionsEn } from './en';
import { termsAndConditionsRo } from './ro';
import type { LegalDocumentContent } from '../legalDocument/types';

export function getTermsAndConditions(language: string): LegalDocumentContent {
  if (language === 'ro') {
    return termsAndConditionsRo;
  }
  return termsAndConditionsEn;
}
