import type { LegalDocumentContent } from '../legalDocument/types';

export type PrivacyPolicyContent = LegalDocumentContent & {
  complaintAuthority?: {
    label: string;
    website: string;
  };
};

export type PrivacyPolicySection = LegalDocumentContent['sections'][number];
export type PrivacyPolicySubsection = NonNullable<PrivacyPolicySection['subsections']>[number];
