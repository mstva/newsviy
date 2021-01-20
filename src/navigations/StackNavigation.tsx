import React from 'react';
import {TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {Appbar, useTheme} from 'react-native-paper';
import {SimpleLineIcons} from '@expo/vector-icons';

import {BottomTabsNavigation} from './BottomTabsNavigation';
import ArticleScreen from "../screens/ArticleScreen";

const StackNavigation = createStackNavigator();

export const StackNavigator = () => {
    const theme = useTheme();
    return (
        <StackNavigation.Navigator
            initialRouteName="FeedList"
            headerMode="screen"
            screenOptions={{
                header: ({scene, previous, navigation}) => {
                    const {options} = scene.descriptor;
                    const title =
                        options.headerTitle !== undefined
                            ? options.headerTitle
                            : options.title !== undefined
                            ? options.title
                            : scene.route.name;

                    return (
                        <Appbar.Header theme={{colors: {primary: theme.colors.surface}}}>
                            {previous ? (
                                <Appbar.BackAction onPress={navigation.goBack} color={theme.colors.primary}/>
                            ) : (
                                <TouchableOpacity style={{marginLeft: 10}} onPress={() => {
                                    ((navigation as any) as DrawerNavigationProp<{}>).openDrawer();
                                }}>
                                    <SimpleLineIcons name="menu" size={24} color={theme.colors.primary}/>
                                </TouchableOpacity>
                            )}
                            <Appbar.Content title={title} titleStyle={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: theme.colors.primary,
                            }}/>
                        </Appbar.Header>
                    );
                },
            }}
        >
            <StackNavigation.Screen
                name="FeedList"
                component={BottomTabsNavigation}
                options={({route}) => {
                    console.log('!@# options', {route});
                    // @ts-ignore
                    const routeName = route.state ? route.state.routes[route.state.index].name : 'Feed';
                    return {headerTitle: routeName};
                }}
            />
            <StackNavigation.Screen name="ArticleScreen" component={ArticleScreen}/>
        </StackNavigation.Navigator>
    );
};
