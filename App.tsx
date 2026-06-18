import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashOverlay from './components/SplashOverlay';
import { useAppPermissions } from './hooks/useAppPermissions';
import HomeScreen from './pages/HomeScreen';
import PrivacyPolicyScreen from './pages/PrivacyPolicyScreen';
import TermsAndConditionsScreen from './pages/TermsAndConditionsScreen';
import WebViewPage from './pages/WebViewPage';

SplashScreen.preventAutoHideAsync().catch(() => {
  // Dev hot reload can reject; native splash still works on cold start.
});

type ScreenState =
  | { name: 'home' }
  | { name: 'privacy' }
  | { name: 'terms' }
  | {
      name: 'webview';
      url: string;
      title: string;
    };

export default function App() {
  const [screen, setScreen] = useState<ScreenState>({ name: 'home' });
  const [appIsReady, setAppIsReady] = useState(false);
  const [showSplashOverlay, setShowSplashOverlay] = useState(true);

  useAppPermissions();

  useEffect(() => {
    setAppIsReady(true);
  }, []);

  const onRootLayout = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <View style={styles.root} onLayout={onRootLayout}>
        {screen.name === 'privacy' ? (
          <PrivacyPolicyScreen onClose={() => setScreen({ name: 'home' })} />
        ) : screen.name === 'terms' ? (
          <TermsAndConditionsScreen onClose={() => setScreen({ name: 'home' })} />
        ) : screen.name === 'webview' ? (
          <WebViewPage
            url={screen.url}
            title={screen.title}
            onClose={() => setScreen({ name: 'home' })}
          />
        ) : (
          <HomeScreen
            onOpenPage={(url, title) => {
              setScreen({ name: 'webview', url, title });
            }}
            onOpenPrivacy={() => {
              setScreen({ name: 'privacy' });
            }}
            onOpenTerms={() => {
              setScreen({ name: 'terms' });
            }}
          />
        )}

        {showSplashOverlay ? (
          <SplashOverlay onFinish={() => setShowSplashOverlay(false)} />
        ) : null}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
