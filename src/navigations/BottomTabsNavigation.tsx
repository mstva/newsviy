import React from 'react';
import color from 'color';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {useTheme} from 'react-native-paper';
import {RouteProp} from '@react-navigation/native';
import overlay from '../overlay';
import {StackNavigatorParamlist} from '../types';
import HomeScreen from "../screens/HomeScreen";
import BreakingScreen from "../screens/BreakingScreen";
import FavouriteScreen from "../screens/FavouriteScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createMaterialBottomTabNavigator();

type Props = { route: RouteProp<StackNavigatorParamlist, 'FeedList'>; };

export const BottomTabsNavigation = (props: Props) => {
    const theme = useTheme();
    const tabBarColor = theme.dark ? (overlay(6, theme.colors.surface) as string) : theme.colors.surface;
    return (
        <React.Fragment>
            <Tab.Navigator
                initialRouteName="HomeScreen"
                backBehavior="initialRoute"
                shifting={true}
                activeColor={theme.colors.primary}
                inactiveColor={color(theme.colors.text).alpha(0.6).rgb().string()}
                sceneAnimationEnabled={false}>
                <Tab.Screen name="Home" component={HomeScreen} options={{tabBarIcon: 'home-account', tabBarColor,}}/>
                <Tab.Screen name="Breaking" component={BreakingScreen} options={{tabBarIcon: 'flash-circle', tabBarColor,}}/>
                {/*<Tab.Screen name="Favourite" component={FavouriteScreen} options={{tabBarIcon: 'cards-heart', tabBarColor,}}/>*/}
                {/*<Tab.Screen name="Profile" component={ProfileScreen} options={{tabBarIcon: 'account-circle', tabBarColor,}}/>*/}
            </Tab.Navigator>
        </React.Fragment>
    );
};
