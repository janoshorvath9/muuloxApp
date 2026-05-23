import {
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeftIcon } from 'lucide-react-native';
import { colors } from '../constants/colors';
import type {
  LegalDocumentContent,
  LegalDocumentSection,
  LegalDocumentSubsection,
} from '../content/legalDocument/types';

type LegalDocumentScreenProps = {
  content: LegalDocumentContent;
  appSubtitle: string;
  backA11yLabel: string;
  onClose: () => void;
};

function renderParagraphs(paragraphs: string[] | undefined) {
  if (!paragraphs?.length) {
    return null;
  }

  return paragraphs.map((paragraph) => (
    <Text key={paragraph} style={styles.paragraph}>
      {paragraph}
    </Text>
  ));
}

function renderBullets(bullets: string[] | undefined) {
  if (!bullets?.length) {
    return null;
  }

  return (
    <View style={styles.bulletList}>
      {bullets.map((item) => (
        <View key={item} style={styles.bulletRow}>
          <Text style={styles.bulletMarker}>•</Text>
          <Text style={styles.bulletText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

function renderSubsection(subsection: LegalDocumentSubsection) {
  return (
    <View key={`${subsection.title}-${subsection.paragraphs?.[0] ?? ''}`} style={styles.subsection}>
      {subsection.title ? <Text style={styles.subsectionTitle}>{subsection.title}</Text> : null}
      {renderParagraphs(subsection.paragraphs)}
      {renderBullets(subsection.bullets)}
    </View>
  );
}

function renderSection(section: LegalDocumentSection) {
  return (
    <View key={section.title} style={styles.section}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      {renderParagraphs(section.paragraphs)}
      {renderBullets(section.bullets)}
      {section.subsections?.map((subsection) => renderSubsection(subsection))}
    </View>
  );
}

export default function LegalDocumentScreen({
  content,
  appSubtitle,
  backA11yLabel,
  onClose,
}: LegalDocumentScreenProps) {
  const openFooterLink = () => {
    if (!content.footerLink) {
      return;
    }
    void Linking.openURL(content.footerLink.website);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={onClose}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel={backA11yLabel}
        >
          <ChevronLeftIcon size={22} color={colors.textPrimary} strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={2}>
          {content.documentTitle}
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator
      >
        <Text style={styles.appName}>{appSubtitle}</Text>
        <Text style={styles.lastUpdated}>{content.lastUpdated}</Text>

        {content.sections.map((section) => renderSection(section))}

        {content.footerLink ? (
          <TouchableOpacity
            onPress={openFooterLink}
            style={styles.footerLink}
            accessibilityRole="link"
            accessibilityLabel={content.footerLink.label}
          >
            <Text style={styles.footerLinkText}>
              {content.footerLink.label}:{' '}
              {content.footerLink.website.replace(/^https?:\/\//, '')}
            </Text>
          </TouchableOpacity>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingTop: Platform.OS === 'android' ? 8 : 0,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
    backgroundColor: colors.white,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 44,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  appName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 4,
  },
  lastUpdated: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  section: {
    marginBottom: 22,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  subsection: {
    marginTop: 10,
    marginLeft: 4,
  },
  subsectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  bulletList: {
    gap: 6,
    marginTop: 2,
    marginBottom: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  bulletMarker: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.appPurple,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textPrimary,
  },
  footerLink: {
    marginTop: 4,
    paddingVertical: 8,
  },
  footerLinkText: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.appPurple,
    fontWeight: '600',
  },
});
