export type LegalDocumentSubsection = {
  title: string;
  bullets?: string[];
  paragraphs?: string[];
};

export type LegalDocumentSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  subsections?: LegalDocumentSubsection[];
};

export type LegalDocumentContent = {
  documentTitle: string;
  lastUpdated: string;
  sections: LegalDocumentSection[];
  footerLink?: {
    label: string;
    website: string;
  };
};
