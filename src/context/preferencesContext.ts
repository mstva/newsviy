import React from 'react';

type PreferencesContextType = {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
};

export const PreferencesContext = React.createContext<PreferencesContextType>({
  theme: 'dark',
  toggleTheme: () => {},
});
