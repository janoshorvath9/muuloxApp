import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getPrivacyPolicy } from '../content/privacyPolicy';
import LegalDocumentScreen from './LegalDocumentScreen';

type PrivacyPolicyScreenProps = {
  onClose: () => void;
};

export default function PrivacyPolicyScreen({ onClose }: PrivacyPolicyScreenProps) {
  const { t, i18n } = useTranslation();
  const content = useMemo(() => getPrivacyPolicy(i18n.language), [i18n.language]);

  return (
    <LegalDocumentScreen
      content={{
        ...content,
        footerLink: content.complaintAuthority,
      }}
      appSubtitle={t('privacy.appSubtitle')}
      backA11yLabel={t('privacy.backA11y')}
      onClose={onClose}
    />
  );
}
