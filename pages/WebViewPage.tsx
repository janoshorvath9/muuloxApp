import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { ArrowLeftIcon, RefreshCwIcon, AlertCircleIcon } from 'lucide-react-native';
import { colors } from '../constants/colors';

type WebViewPageProps = {
  url: string;
  title: string;
  onBack: () => void;
};

export default function WebViewPage({ url, title, onBack }: WebViewPageProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const retry = () => {
    setLoading(true);
    setError(false);
    setReloadKey((value) => value + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={onBack}
          style={styles.iconButton}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <ArrowLeftIcon size={20} color="#374151" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {title}
        </Text>
        <TouchableOpacity
          onPress={retry}
          style={styles.iconButton}
          accessibilityRole="button"
          accessibilityLabel="Reload page"
        >
          <RefreshCwIcon size={20} color="#6B7280" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {loading && !error ? (
        <View style={styles.loadingBarTrack}>
          <View style={styles.loadingBarFill} />
        </View>
      ) : null}

      <View style={styles.content}>
        {error ? (
          <View style={styles.errorContainer}>
            <View style={styles.errorIconTile}>
              <AlertCircleIcon size={40} color="#F87171" strokeWidth={2} />
            </View>
            <Text style={styles.errorTitle}>Page unavailable</Text>
            <Text style={styles.errorDescription}>
              Check your internet connection and try again.
            </Text>
            <TouchableOpacity
              onPress={retry}
              style={styles.retryButton}
              accessibilityRole="button"
              accessibilityLabel="Try loading page again"
            >
              <Text style={styles.retryText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <WebView
            key={reloadKey}
            source={{ uri: url }}
            onLoadStart={() => {
              setLoading(true);
              setError(false);
            }}
            onLoadEnd={() => {
              setLoading(false);
            }}
            onError={() => {
              setLoading(false);
              setError(true);
            }}
            startInLoadingState
          />
        )}

        {loading && !error ? (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={colors.appPurple} />
            <Text style={styles.loadingText}>Loading {title}...</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    paddingTop: 56,
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    backgroundColor: colors.white,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
  },
  headerTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
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
