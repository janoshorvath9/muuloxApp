import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { LayoutDashboardIcon, ShoppingBagIcon, ShieldIcon } from 'lucide-react-native';
import { colors } from '../constants/colors';
import { APP_URLS } from '../constants/urls';
import Button from '../components/RowButton';

type HomeScreenProps = {
  onOpenPage: (url: string, title: string) => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
};

export default function HomeScreen({ onOpenPage, onOpenPrivacy, onOpenTerms }: HomeScreenProps) {
  const { t, i18n } = useTranslation();
  const [tapCount, setTapCount] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [lastTap, setLastTap] = useState(0);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const supportedLanguages = ['en', 'hu', 'ro'] as const;
  const currentLanguage = supportedLanguages.includes(i18n.language as (typeof supportedLanguages)[number])
    ? (i18n.language as (typeof supportedLanguages)[number])
    : 'en';

  useEffect(() => {
    return () => {
      if (toastTimerRef.current != null) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const handleLogoTap = () => {
    const now = Date.now();
    const newCount = now - lastTap < 800 ? tapCount + 1 : 1;
    setTapCount(newCount);
    setLastTap(now);

    if (newCount >= 7) {
      setTapCount(0);
      setShowAdmin(true);
      setShowToast(true);
      if (toastTimerRef.current != null) {
        clearTimeout(toastTimerRef.current);
      }
      toastTimerRef.current = setTimeout(() => {
        setShowToast(false);
      }, 2500);
    }
  };

  const handleLanguageSwitch = () => {
    const currentIndex = supportedLanguages.indexOf(currentLanguage);
    const nextLanguage = supportedLanguages[(currentIndex + 1) % supportedLanguages.length];
    void i18n.changeLanguage(nextLanguage);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <TouchableOpacity
        onPress={handleLanguageSwitch}
        style={styles.languageSwitcher}
        accessibilityRole="button"
        accessibilityLabel="Switch language"
      >
        <Text style={styles.languageSwitcherText}>{currentLanguage.toUpperCase()}</Text>
      </TouchableOpacity>

      {showToast ? (
        <View style={styles.toast}>
          <Text style={styles.toastText}>{t('home.toastAdminUnlocked')}</Text>
        </View>
      ) : null}

      <TouchableOpacity
        onPress={handleLogoTap}
        activeOpacity={0.85}
        style={styles.logoTapArea}
        accessibilityRole="button"
        accessibilityLabel={t('home.logoA11y')}
      >
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </TouchableOpacity>

      <Text style={styles.description}>{t('home.tagline')}</Text>

      <Button
        title={t('home.shopTitle')}
        description={t('home.shopDescription')}
        icon={<ShoppingBagIcon color={colors.appPurple} size={28} strokeWidth={2} />}
        onPress={() => onOpenPage(APP_URLS.shop, t('home.shopWebviewTitle'))}
        variant="secondary"
      />


      <Button
        title={t('home.portalTitle')}
        description={t('home.portalDescription')}
        icon={<LayoutDashboardIcon color={colors.white} size={28} strokeWidth={2} />}
        onPress={() => onOpenPage(APP_URLS.portal, t('home.portalWebviewTitle'))}
        variant="primary"
      />

      {showAdmin ? (
        <Button
          title={t('home.adminTitle')}
          description={t('home.adminDescription')}
          icon={<ShieldIcon color={colors.white} size={28} strokeWidth={2} />}
          onPress={() => onOpenPage(APP_URLS.admin, t('home.adminWebviewTitle'))}
          variant="admin"
        />
      ) : null}

      <View style={styles.legalFooter}>
        <TouchableOpacity
          onPress={onOpenPrivacy}
          accessibilityRole="button"
          accessibilityLabel={t('home.legalPrivacyA11y')}
        >
          <Text style={styles.legalLink}>{t('home.legalPrivacy')}</Text>
        </TouchableOpacity>
        <Text style={styles.legalSeparator}>·</Text>
        <TouchableOpacity
          onPress={onOpenTerms}
          accessibilityRole="button"
          accessibilityLabel={t('home.legalTermsA11y')}
        >
          <Text style={styles.legalLink}>{t('home.legalTerms')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.background,
    alignItems: 'center',
    gap: 5,
  },
  languageSwitcher: {
    position: 'absolute',
    top: 52,
    right: 16,
    zIndex: 10,
    minWidth: 54,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  languageSwitcherText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: 0.4,
  },
  toast: {
    position: 'absolute',
    top: 52,
    zIndex: 10,
    backgroundColor: colors.appPurple,
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  toastText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '600',
  },
  logoTapArea: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '100%',
    height: 80,
    resizeMode: 'contain',
    marginTop: 40,
    marginBottom: 80,
  },
  description: {
    width: '90%',
    paddingHorizontal: 18,
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 34,
  },
  legalFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 28,
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  legalLink: {
    fontSize: 13,
    color: colors.appPurple,
    fontWeight: '600',
  },
  legalSeparator: {
    fontSize: 13,
    color: colors.textSecondary,
  },
});
