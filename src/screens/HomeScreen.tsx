import * as React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import SwipeScreen from "./Swipe";

export default class HomeScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <SwipeScreen/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})
