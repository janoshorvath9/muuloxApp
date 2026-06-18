import { useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';

export function useAppPermissions() {
  useEffect(() => {
    void (async () => {
      await ImagePicker.requestCameraPermissionsAsync();
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    })();
  }, []);
}
