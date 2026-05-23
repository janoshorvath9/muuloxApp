import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getTermsAndConditions } from '../content/termsAndConditions';
import LegalDocumentScreen from './LegalDocumentScreen';

type TermsAndConditionsScreenProps = {
  onClose: () => void;
};

export default function TermsAndConditionsScreen({ onClose }: TermsAndConditionsScreenProps) {
  const { t, i18n } = useTranslation();
  const content = useMemo(() => getTermsAndConditions(i18n.language), [i18n.language]);

  return (
    <LegalDocumentScreen
      content={content}
      appSubtitle={t('terms.appSubtitle')}
      backA11yLabel={t('terms.backA11y')}
      onClose={onClose}
    />
  );
}
