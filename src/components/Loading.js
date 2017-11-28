/**
 * Created by hehui on 2017/11/25.
 */
import React, { Component } from 'react'
import{
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native'
const { width, height } = Dimensions.get('window')
export default class Loading extends Component {
    render() {
        return (
            <View style={styles.maskWrap}>
                <View style={styles.loadingWrap}>
                    <ActivityIndicator
                        style={styles.loadingItem}
                        animating={true}
                        size="large"
                    />
                    <Text style={styles.text}>加载中...</Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    maskWrap: {
        position: 'absolute',
        zIndex: 10,
        top: 0,
        left: 0,
        width,
        height: height - (Platform.OS === 'ios' ? 44 : 56),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    loadingWrap: {

        padding: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 5
    },
    text: {
        color: '#fff',
        textAlign: 'center',
        marginTop: 10,
    }
})