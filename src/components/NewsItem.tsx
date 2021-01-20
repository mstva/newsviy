import React from 'react'
import {Linking, StyleSheet, Text, View} from "react-native";
import moment from 'moment'
import {Card, Button} from 'react-native-elements'
import {newsDataProps} from "../types";
import {useNavigation} from "@react-navigation/native";
import {WebView} from "react-native-webview";

export default function NewsItem(props: newsDataProps) {
    const navigation = useNavigation()
    const { newsData } = props
    const onPress = () => {
        Linking.openURL(newsData.url).catch(err => console.error('An error occurred', err));
    }
    const time = moment(newsData.publishedAt).fromNow()
    return (
        <Card containerStyle={{ borderRadius: 20 }}>
            <Card.Image source={{uri:newsData.urlToImage}}/>
            <View style={styles.sourceContainer}>
                <Text style={styles.source}>{newsData.source.name}</Text>
                <Text>{time}</Text>
            </View>
            <Card.Title numberOfLines={2} style={styles.title}>{newsData.title}</Card.Title>
            <Button buttonStyle={styles.button} title='READ NOW' onPress={() => onPress}/>
        </Card>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sourceContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 5,
        justifyContent: 'space-between',

    },
    source: {
        color: 'tomato',
        fontWeight: 'bold',
    },
    title: {
        textAlign: 'left'
    },
    description: {
        margin: 10,
    },
    button: {
        borderRadius: 25,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
        backgroundColor: 'tomato'
    }
})
