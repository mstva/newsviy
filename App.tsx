import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppearanceProvider } from 'react-native-appearance';

import { MainNavigation} from './src/navigations/MainNavigation';

export default function App() {
  return (
      <SafeAreaProvider>
        <AppearanceProvider>
          <MainNavigation />
        </AppearanceProvider>
      </SafeAreaProvider>
  );
}