import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function FavouriteScreen() {
    return (
        <View style={styles.container}>
            <Text>Favourite</Text>
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
