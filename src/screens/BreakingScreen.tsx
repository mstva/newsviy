import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import NewsList from "../components/NewsList";

export default function BreakingScreen() {
    return (
        <View style={styles.container}>
            <NewsList/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
