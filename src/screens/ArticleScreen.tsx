import {Linking, StyleSheet, Text, View} from "react-native";
import React from "react";
import {useRoute} from "@react-navigation/native";
import {WebView} from "react-native-webview";

export default function ArticleScreen() {

    const openLink = () => {
        const url = 'http://stackoverflow.com'
        Linking.openURL(url).catch(err => console.error('An error occurred', err));
    }

    return (openLink)

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})