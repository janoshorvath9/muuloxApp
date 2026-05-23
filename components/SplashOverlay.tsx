import { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';

/** Matches `imageWidth` in app.json expo-splash-screen plugin config */
const SPLASH_LOGO_WIDTH = 280;

const HOLD_MS = 500;
const FADE_MS = 400;

type SplashOverlayProps = {
  onFinish: () => void;
};

export default function SplashOverlay({ onFinish }: SplashOverlayProps) {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const holdTimer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: FADE_MS,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          onFinish();
        }
      });
    }, HOLD_MS);

    return () => clearTimeout(holdTimer);
  }, [opacity, onFinish]);

  return (
    <Animated.View style={[styles.container, { opacity }]} pointerEvents="auto">
      <Image
        source={require('../assets/splash.png')}
        style={styles.logo}
        resizeMode="contain"
        accessibilityIgnoresInvertColors
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  logo: {
    width: SPLASH_LOGO_WIDTH,
    height: 100,
  },
});
