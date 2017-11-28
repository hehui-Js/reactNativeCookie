/**
 * Created by hehui on 2017/11/25.
 */
import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    DeviceEventEmitter,
    Alert,
    FlatList,
    Image,
    TouchableOpacity,
    PixelRatio
} from 'react-native'
import Http from '../utils/Http'
export default class ListPage extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.state.params.categoryInfo.name
    })

    constructor(props) {
        super(props)
        const categoryInfo = this.props.navigation.state.params.categoryInfo
        this.state = {
            ctgId: categoryInfo.ctgId,
            isEnd: false,
            pageSize: 20,
            page: 1,
            dataList: [],
            isLoading: false
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    async fetchData() {
        try {
            if (this.state.isEnd) {
                return
            }
            if (this.state.isLoading) {
                return
            }
            this.setState({
                isLoading: true
            })
            this.state.page === 1 && DeviceEventEmitter.emit('loading', true)
            const postData = {
                cid: this.state.ctgId,
                page: this.state.page,
                pageSize: this.state.pageSize
            }
            const res = await Http.get('/cook/menu/search', postData)
            this.state.page === 1 && DeviceEventEmitter.emit('loading', false)
            if (res.retCode === '200') {
                this.setState({
                    dataList: this.state.dataList.concat(res.result.list),
                    page: this.state.page + 1,
                    isLoading: false,
                    isEnd: this.state.dataList.length >= res.result.total
                })
            }
        } catch (error) {
            Alert.alert('提示', '出错了!!!')
        }
    }

    toDetail(item) {
        const { navigate } = this.props.navigation
        navigate('Detail', item)
    }

    renderItem(obj) {
        const item = obj.item
        return <TouchableOpacity activeOpacity={0.85} onPress={() => this.toDetail(item)}>
            <View style={styles.itemWrap}>
                <View style={styles.itemContent}>
                    <Image source={{ uri: item.thumbnail }} style={styles.img}/>
                    <View style={styles.content}>
                        <Text style={styles.title}>{item.name}</Text>
                        <View style={styles.itemList}>
                            {
                                item.ctgTitles && item.ctgTitles.split(',').map((childItem, childIndex) => {
                                    return <Text key={childIndex} style={styles.itemName}>{childItem}</Text>
                                })
                            }
                        </View>
                    </View>
                </View>
                <View style={styles.rightArrow}></View>
            </View>
        </TouchableOpacity>
    }

    renderFooter() {
        return (
            this.state.dataList.length ?
                <Text style={styles.loadingText}>
                    {this.state.isEnd ? "加载完了" : this.state.isLoading ? '加载中...' : '加载更多'}
                </Text>
                : null
        )
    }

    render() {
        return <View style={styles.contains}>
            <FlatList
                data={this.state.dataList}
                renderItem={(item) => this.renderItem(item)}
                keyExtractor={(item, index) => index}
                onEndReached={() => this.fetchData()}
                initialNumToRender={200}
                onEndReachedThreshold={10}
                ListFooterComponent={() => this.renderFooter()}
            />
        </View>
    }
}
const styles = StyleSheet.create({
    contains: {
        flex: 1,
        backgroundColor: '#fff',
    },
    itemWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1 / PixelRatio.get()
    },
    itemContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 17,
        fontWeight: '600',
        marginBottom: 10
    },
    itemList: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    },
    itemName: {
        fontSize: 13,
        backgroundColor: 'orange',
        borderRadius: 6,
        paddingVertical: 6,
        paddingHorizontal: 12,
        marginRight: 6,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 6,
    },
    img: {
        width: 100,
        height: 100,
        marginRight: 10
    },
    rightArrow: {
        width: 15,
        height: 15,
        borderTopWidth: 1 / PixelRatio.get(),
        borderRightWidth: 1 / PixelRatio.get(),
        borderTopColor: '#acacac',
        borderRightColor: '#acacac',
        transform: [{ rotate: '45deg' }],
        zIndex: 9,
    },
    loadingText: {
        textAlign: "center",
        fontSize: 14,
        color: '#fff',
        padding: 10,
        backgroundColor: '#ccc'
    }
})