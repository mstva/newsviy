import { MaterialCommunityIcons } from '@expo/vector-icons';
import {DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerNavigationProp,} from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {Drawer, Switch, Text, TouchableRipple,} from 'react-native-paper';
import { PreferencesContext } from '../context/preferencesContext';

type Props = DrawerContentComponentProps<DrawerNavigationProp<any>>;

export function DrawerContent(props: Props) {
  const { theme,toggleTheme } = React.useContext(PreferencesContext);
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <View>
          <TouchableOpacity onPress={() => {props.navigation.toggleDrawer();}}>
            <View style={{ justifyContent: "center", alignItems: "center", height: 100, backgroundColor: 'orange' }}>
              <Text style={{ fontSize: 25, fontWeight: "800", color: 'black' }}>newsviy</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem icon={({ color, size }) => (<MaterialCommunityIcons name="account-outline" color={color} size={size}/>)} label="Profile" onPress={() => {}}/>
          <DrawerItem icon={({ color, size }) => (<MaterialCommunityIcons name="tune" color={color} size={size} />)} label="Preferences" onPress={() => {}}/>
          <DrawerItem icon={({ color, size }) => (<MaterialCommunityIcons name="bookmark-outline" color={color} size={size}/>)} label="Bookmarks" onPress={() => {}}/>
        </Drawer.Section>
        <Drawer.Section title="Preferences">
          <TouchableRipple onPress={toggleTheme}>
            <View style={styles.preference}>
              <Text>Dark Theme</Text>
              <View pointerEvents="none">
                <Switch value={theme === 'light'} />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
