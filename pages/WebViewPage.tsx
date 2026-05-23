import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StatusBar } from 'expo-status-bar';
import {
  ActivityIndicator,
  BackHandler,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { ArrowLeftIcon, RefreshCwIcon, AlertCircleIcon, HouseIcon } from 'lucide-react-native';
import { colors } from '../constants/colors';

type WebViewPageProps = {
  url: string;
  title: string;
  onClose: () => void;
};

export default function WebViewPage({ url, title, onClose }: WebViewPageProps) {
  const { t } = useTranslation();
  const webViewRef = useRef<WebView>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [canGoBack, setCanGoBack] = useState(false);
  const [hasRenderedOnce, setHasRenderedOnce] = useState(false);

  const handleBack = useCallback(() => {
    if (canGoBack) {
      webViewRef.current?.goBack();
      return true;
    }

    onClose();
    return true;
  }, [canGoBack, onClose]);

  useEffect(() => {
    if (Platform.OS !== 'android') {
      return;
    }

    const subscription = BackHandler.addEventListener('hardwareBackPress', handleBack);
    return () => {
      subscription.remove();
    };
  }, [handleBack]);

  const retry = () => {
    setLoading(true);
    setError(false);
    setReloadKey((value) => value + 1);
  };

  const isPortalOrAdminPage =
    url.includes('/portal/') || url === 'https://demo.muulox.com/' || url.includes('demo.muulox.com');
  const webviewChromeColor = isPortalOrAdminPage ? '#4A4A66' : colors.white;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: webviewChromeColor }]}>
      <StatusBar
        style={isPortalOrAdminPage ? 'light' : 'dark'}
        translucent={false}
        hidden={false}
        backgroundColor={webviewChromeColor}
      />

      {loading && !error ? (
        <View style={styles.loadingBarTrack}>
          <View style={styles.loadingBarFill} />
        </View>
      ) : null}

      <View style={styles.floatingActionGroup}>
        <TouchableOpacity
          onPress={handleBack}
          style={[styles.floatingActionButton, !canGoBack && styles.floatingActionButtonMuted]}
          accessibilityRole="button"
          accessibilityLabel={t('webview.backA11y')}
        >
          <ArrowLeftIcon size={18} color="#6B7280" strokeWidth={2} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={retry}
          style={styles.floatingActionButton}
          accessibilityRole="button"
          accessibilityLabel={t('webview.reloadA11y')}
        >
          <RefreshCwIcon size={18} color="#6B7280" strokeWidth={2} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onClose}
          style={styles.floatingActionButton}
          accessibilityRole="button"
          accessibilityLabel={t('webview.homeA11y')}
        >
          <HouseIcon size={18} color="#6B7280" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {error ? (
          <View style={styles.errorContainer}>
            <View style={styles.errorIconTile}>
              <AlertCircleIcon size={40} color="#F87171" strokeWidth={2} />
            </View>
            <Text style={styles.errorTitle}>{t('webview.errorTitle')}</Text>
            <Text style={styles.errorDescription}>{t('webview.errorDescription')}</Text>
            <TouchableOpacity
              onPress={retry}
              style={styles.retryButton}
              accessibilityRole="button"
              accessibilityLabel={t('webview.retryA11y')}
            >
              <Text style={styles.retryText}>{t('webview.retry')}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <WebView
            ref={webViewRef}
            key={reloadKey}
            source={{ uri: url }}
            allowsBackForwardNavigationGestures
            onNavigationStateChange={(navState) => {
              setCanGoBack(navState.canGoBack);
            }}
            onLoadStart={() => {
              setLoading(true);
              setError(false);
            }}
            onLoadEnd={() => {
              setLoading(false);
              setHasRenderedOnce(true);
            }}
            onError={() => {
              setLoading(false);
              setError(true);
            }}
            startInLoadingState
          />
        )}

        {loading && !error && !hasRenderedOnce ? (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={colors.appPurple} />
            <Text style={styles.loadingText}>{t('webview.loading', { title })}</Text>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  loadingBarTrack: {
    height: 2,
    backgroundColor: 'rgba(38,171,190,0.2)',
  },
  loadingBarFill: {
    width: '65%',
    height: '100%',
    backgroundColor: colors.appPurple,
  },
  content: {
    flex: 1,
  },
  floatingActionGroup: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 112 : 92,
    left: 12,
    zIndex: 10,
    gap: 8,
  },
  floatingActionButton: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  floatingActionButtonMuted: {
    opacity: 0.55,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    backgroundColor: '#F9FAFB',
  },
  errorIconTile: {
    width: 80,
    height: 80,
    borderRadius: 999,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  errorDescription: {
    marginTop: 8,
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 22,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 999,
    backgroundColor: colors.appPurple,
  },
  retryText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '600',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: colors.white,
  },
  loadingText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
});
