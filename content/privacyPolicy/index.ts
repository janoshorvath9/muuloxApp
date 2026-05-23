import { privacyPolicyEn } from './en';
import { privacyPolicyRo } from './ro';
import type { PrivacyPolicyContent } from './types';

export function getPrivacyPolicy(language: string): PrivacyPolicyContent {
  if (language === 'ro') {
    return privacyPolicyRo;
  }
  return privacyPolicyEn;
}

export type { PrivacyPolicyContent, PrivacyPolicySection, PrivacyPolicySubsection } from './types';
