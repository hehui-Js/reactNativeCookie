/**
 * Created by hehui on 2017/11/25.
 */
import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Alert,
    TouchableOpacity,
    Dimensions,
    PixelRatio,
    DeviceEventEmitter
} from 'react-native'
import Http from '../utils/Http'
const winWidth = Dimensions.get('window').width
export default class HomePage extends Component {
    static navigationOptions = {
        headerTitle: '菜谱'
    }

    constructor(props) {
        super(props)
        this.state = {
            dataList: [],
            isLoading: false
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    toList(item) {
        const { navigate } = this.props.navigation
        navigate('List', item)
    }

    async fetchData() {
        try {
            DeviceEventEmitter.emit('loading', true)
            const res = await Http.get('/cook/category/query')
            DeviceEventEmitter.emit('loading', false)
            if (res.retCode === '200') {
                this.setState({
                    dataList: res.result.childs
                })
            }
        } catch (error) {
            Alert.alert('提示', '出错了！！')
        }
    }

    renderItem(obj) {
        const item = obj.item
        return <View style={styles.itemWrap}>
            <Text style={styles.title}>{item.categoryInfo.name}</Text>
            <View style={styles.listWrap}>
                {
                    item.childs.length && item.childs.map((childItem, childIndex) => {
                        return <TouchableOpacity key={childIndex} activeOpacity={0.85}
                                                 onPress={() => this.toList(childItem)}>
                            <Text
                                style={[styles.itemName, { marginRight: ((childIndex + 1) % 4 === 0 && childIndex > 0 ? 0 : 10 ) }]}>{childItem.categoryInfo.name}</Text>
                        </TouchableOpacity>
                    })
                }
            </View>
        </View>
    }

    render() {
        return <View style={styles.contains}>
            <FlatList
                data={this.state.dataList}
                initialNumToRender={100}
                keyExtractor={(item, index) => index}
                renderItem={(item) => this.renderItem(item)}
            />
        </View>
    }
}
const styles = StyleSheet.create({
    contains: {
        flex: 1,
        backgroundColor: '#fff'
    },
    itemWrap: {
        padding: 8
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        padding: 8,
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: '#ccc'
    },
    listWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
    },
    itemName: {
        width: (winWidth - 20 - 30) / 4,
        textAlign: 'center',
        borderWidth: 1 / PixelRatio.get(),
        borderRadius: 4,
        paddingVertical: 10,
        marginBottom: 10,
        fontSize: 12,
        borderColor: '#ccc'
    }
})