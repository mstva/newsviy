import React from 'react';
import {
    Provider as PaperProvider,
    DefaultTheme,
    DarkTheme,
} from 'react-native-paper';
import {I18nManager} from 'react-native';
import {Updates} from 'expo';
import {useColorScheme} from 'react-native-appearance';

import {RootNavigation} from './RootNavigation';
import {PreferencesContext} from '../context/preferencesContext';

export const MainNavigation = () => {

    const colorScheme = useColorScheme();

    const [theme, setTheme] = React.useState<'light' | 'dark'>(colorScheme === 'light' ? 'light' : 'dark');

    function toggleTheme() {setTheme(theme => (theme === 'dark' ? 'light' : 'dark'));}

    const preferences = React.useMemo(() => ({toggleTheme, theme,}), [theme]);

    return (
        <PreferencesContext.Provider value={preferences}>
            <PaperProvider theme={theme === 'dark' ? {...DefaultTheme, colors: {...DefaultTheme.colors, primary: '#f28a1b'},} : {...DarkTheme, colors: {...DarkTheme.colors, primary: '#f28a1b'},}}>
                <RootNavigation/>
            </PaperProvider>
        </PreferencesContext.Provider>
    );
};
