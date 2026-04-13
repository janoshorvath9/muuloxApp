import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { LayoutDashboardIcon, ShoppingBagIcon, ShieldIcon } from 'lucide-react-native';
import { colors } from '../constants/colors';
import Button from '../components/RowButton';

type HomeScreenProps = {
  onOpenPage: (url: string, title: string) => void;
};

export default function HomeScreen({ onOpenPage }: HomeScreenProps) {
  const [tapCount, setTapCount] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [lastTap, setLastTap] = useState(0);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {showToast ? (
        <View style={styles.toast}>
          <Text style={styles.toastText}>Admin mode unlocked</Text>
        </View>
      ) : null}

      <TouchableOpacity
        onPress={handleLogoTap}
        activeOpacity={0.85}
        style={styles.logoTapArea}
        accessibilityRole="button"
        accessibilityLabel="Muulox logo"
      >
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </TouchableOpacity>

      <Text style={styles.description}>Your portal to Muulox services</Text>

      <Button
        title="Client Dashboard"
        description="Access your ERP portal"
        icon={<LayoutDashboardIcon color={colors.white} size={28} strokeWidth={2} />}
        onPress={() => onOpenPage('https://demo.muulox.com/portal/', 'Client Dashboard')}
        variant="primary"
      />

      <Button
        title="Website & Shop"
        description="Browse products & services"
        icon={<ShoppingBagIcon color={colors.appPurple} size={28} strokeWidth={2} />}
        onPress={() => onOpenPage('https://muulox.com/', 'Website & Shop')}
        variant="secondary"
      />

      {showAdmin ? (
        <Button
          title="Admin Panel"
          description="Restricted access"
          icon={<ShieldIcon color={colors.white} size={28} strokeWidth={2} />}
          onPress={() => onOpenPage('https://demo.muulox.com/', 'Admin Panel')}
          variant="admin"
        />
      ) : null}
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
    height: 100,
    resizeMode: 'contain',
    marginBottom: 100,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});
