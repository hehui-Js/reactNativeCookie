/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Text,
    DeviceEventEmitter
} from 'react-native';
import { StackNavigator } from 'react-navigation'
import HomePage from './src/pages/HomePage'
import ListPage from './src/pages/ListPage'
import DetailPage from './src/pages/DetailPage'
import Loading from './src/components/Loading'
export default class App extends Component<{}> {
    constructor(props) {
        super(props)
        this.state = {
            isShowLoading: true
        }
    }

    componentDidMount() {
        this.listener = DeviceEventEmitter.addListener('loading', (isShowLoading) => {
            this.setState({
                isShowLoading
            })
        })
    }

    componentWillUnmount() {
        this.listener && this.listener.remove()
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.isShowLoading ? <Loading/> : null
                }
                <StackList />
            </View>
        );
    }
}

const StackList = StackNavigator({
    Home: {
        screen: HomePage,
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#FF3030'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff',
                fontWeight: '700',
                fontSize: 18
            },
            headerBackTitleStyle: {
                color: '#fff'
            }
        }
    },
    List: {
        screen: ListPage,
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#FF3030',
                borderBottomWidth: 0,
                borderBottomColor: 'transparent',
                elevation: 0,
                shadowOpacity: 0,
                shadowColor: 'transparent',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff',
                fontWeight: '700',
                fontSize: 18
            },
            headerBackTitleStyle: {
                color: '#fff'
            }
        }
    },
    Detail: {
        screen: DetailPage,
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#FF3030',
                borderBottomWidth: 0,
                borderBottomColor: 'transparent',
                elevation: 0,
                shadowOpacity: 0,
                shadowColor: 'transparent',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff',
                fontWeight: '700',
                fontSize: 18
            },
            headerBackTitleStyle: {
                color: '#fff'
            }
        }
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
