import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { StackNavigator } from './StackNavigation';
import { DrawerContent } from '../components/DrawerContent';

const Drawer = createDrawerNavigator();

export const RootNavigation = () => {
  const theme = useTheme();
  const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;

    return (
    <NavigationContainer theme={navigationTheme}>
      <Drawer.Navigator drawerContent={
          // @ts-ignore
          props => <DrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={StackNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
