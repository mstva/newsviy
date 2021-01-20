import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder } from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
import axios from "axios";
import moment from "moment";

export default class SwipeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentIndex: 0,
            articles: []
        }

        this.position = new Animated.ValueXY()

        this.rotate = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: ['-10deg', '0deg', '10deg'],
            extrapolate: 'clamp'
        })

        this.rotateAndTranslate = {
            transform: [{rotate: this.rotate}, ...this.position.getTranslateTransform()]
        }

        this.likeOpacity = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [0, 0, 1],
            extrapolate: 'clamp'
        })

        this.dislikeOpacity = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [1, 0, 0],
            extrapolate: 'clamp'
        })

        this.nextCardOpacity = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [1, 0, 1],
            extrapolate: 'clamp'
        })

        this.nextCardScale = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [1, 0.8, 1],
            extrapolate: 'clamp'
        })
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
                this.setState({articles: response.data.articles})
            })
            .catch(error => console.log(error))
    }

    componentWillMount() {
        this.PanResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {
                this.position.setValue({ x: gestureState.dx, y: gestureState.dy })
            },
            onPanResponderRelease: (evt, gestureState) => {
                if (gestureState.dx > 120) {
                    Animated.spring(this.position, {
                        toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy, useNativeDriver: true }
                    }).start(() => {
                        this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                            this.position.setValue({ x: 0, y: 0 })
                        })
                    })
                }
                else if (gestureState.dx < -120) {
                    Animated.spring(this.position, {
                        toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy, useNativeDriver: true }
                    }).start(() => {
                        this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                            this.position.setValue({ x: 0, y: 0 })
                        })
                    })
                }
                else {
                    Animated.spring(this.position, {
                        useNativeDriver: false,
                        toValue: { x: 0, y: 0 },
                        friction: 4
                    }).start()
                }
            }
        })
    }

    renderArticles = () => {
        const {articles} = this.state
        return articles.map((item, i) => {
            if (i < this.state.currentIndex) return null
            else if (i === this.state.currentIndex) {
                return (
                    <Animated.View {...this.PanResponder.panHandlers} key={this.state.currentIndex} style={[this.rotateAndTranslate, styles.container]}>
                        <Animated.View style={[{opacity: this.likeOpacity}, styles.likeContainer]}>
                            <Text style={styles.likeText}>LIKE</Text>
                        </Animated.View>
                        <Animated.View style={[styles.nopeContainer, {opacity: this.dislikeOpacity}]}>
                            <Text style={styles.nopeText}>NOPE</Text>
                        </Animated.View>
                        <Image style={styles.image} source={{uri: item.urlToImage}} />
                        <View style={{backgroundColor: 'tomato', borderBottomRightRadius: 10, borderBottomLeftRadius: 10, paddingVertical: 20, paddingHorizontal: 10,}}>
                            <Text style={{color: 'white', fontSize: 25, fontWeight: '500', textAlign: "center",}}>{item.title}</Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10, marginHorizontal: 10 }}>
                                <Text style={{ color: 'white', fontSize: 16, }}>{item.source.name}</Text>
                                <Text style={{ color: 'white', fontSize: 14, }}>{moment(item.publishedAt).fromNow()}</Text>
                            </View>
                        </View>
                    </Animated.View>
                )
            }
            else {
                return (
                    <Animated.View key={item.source.id} style={[{opacity: this.nextCardOpacity, transform: [{ scale: this.nextCardScale }]}, styles.container]}>
                        <Animated.View style={[{opacity: 0}, styles.likeContainer]}>
                            <Text style={styles.likeText}>LIKE</Text>
                        </Animated.View>
                        <Animated.View style={[styles.nopeContainer, { opacity: 0 }]}>
                            <Text style={styles.nopeText}>NOPE</Text>
                        </Animated.View>
                        <Image style={styles.image} source={{uri: item.urlToImage}} />
                        <View style={{backgroundColor: 'tomato', borderBottomRightRadius: 10, borderBottomLeftRadius: 10,paddingVertical: 20, paddingHorizontal: 10,}}>
                            <Text style={{color: 'white', fontSize: 25, fontWeight: '500', textAlign: "center",}}>{item.title}</Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10, marginHorizontal: 10 }}>
                                <Text style={{ color: 'white', fontSize: 16, }}>{item.source.name}</Text>
                                <Text style={{ color: 'white', fontSize: 14, }}>{moment(item.publishedAt).fromNow()}</Text>
                            </View>
                        </View>
                    </Animated.View>
                )
            }
        }).reverse()
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ height: 60 }}/>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>{this.renderArticles()}</View>
                <View style={{ height: 60 }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: SCREEN_HEIGHT - 120,
        width: SCREEN_WIDTH,
        padding: 10,
        position: 'absolute',
    },
    likeContainer: {
        transform: [{ rotate: '-30deg' }],
        position: 'absolute',
        top: 50,
        left: 40,
        zIndex: 1000
    },
    likeText: {
        borderWidth: 1,
        borderColor: 'green',
        color: 'green',
        fontSize: 32,
        fontWeight: '800',
        padding: 10
    },
    nopeContainer: {
        transform: [{ rotate: '30deg' }],
        position: 'absolute',
        top: 50,
        right: 40,
        zIndex: 1000
    },
    nopeText: {
        borderWidth: 1,
        borderColor: 'red',
        color: 'red',
        fontSize: 32,
        fontWeight: '800',
        padding: 10
    },
    image: {
        flex: 1,
        height: null,
        width: null,
        resizeMode: 'cover',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    }
});