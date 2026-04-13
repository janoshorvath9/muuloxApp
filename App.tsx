import { useState } from 'react';
import HomeScreen from './pages/HomeScreen';
import WebViewPage from './pages/WebViewPage';

type ScreenState =
  | { name: 'home' }
  | {
      name: 'webview';
      url: string;
      title: string;
    };

export default function App() {
  const [screen, setScreen] = useState<ScreenState>({ name: 'home' });

  if (screen.name === 'webview') {
    return (
      <WebViewPage
        url={screen.url}
        title={screen.title}
        onBack={() => setScreen({ name: 'home' })}
      />
    );
  }

  return (
    <HomeScreen
      onOpenPage={(url, title) => {
        setScreen({ name: 'webview', url, title });
      }}
    />
  );
}
