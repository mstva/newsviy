import React, { Component } from 'react'
import {Alert, StyleSheet, Text, View, FlatList, ActivityIndicator} from "react-native";
import NewsItem from "./NewsItem";
import axios from "axios";

export default class NewsList extends Component {

    constructor(props: {}) {
        super(props);
        this.state = { data: [] }
    }

    componentDidMount() {
        const url = 'http://newsapi.org/v2/top-headlines'
        axios.get(url, {
            params: {
                country: 'us',
                category: 'technology',
                apiKey: 'cb0d6a9563a9462c81eeca7022a5ce70',
            }
        })
            .then(response => {
                console.log(response.data.articles)
                this.setState({data: response.data.articles})
            })
            .catch(error => console.log(error))
    }

    render() {
        // @ts-ignore
        const { data } = this.state
        return(<FlatList data={data} renderItem={({item}) => ( <NewsItem newsData={item}/> )}/>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
