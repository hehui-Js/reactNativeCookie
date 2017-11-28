/**
 * Created by hehui on 2017/11/25.
 */
import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    Platform,
    Dimensions
} from 'react-native'
const winWidth = Dimensions.get('window').width
export default class ListView extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.name}`
    })

    constructor(props) {
        super(props)
        this.state = this.props.navigation.state.params

    }

    renderMethod() {
        const methods = JSON.parse(this.state.recipe.method)
        return <View>
            {methods.map((item, index) => {
                const imgView = item.img ? <View style={styles.imgContainer}><Image
                    source={{ uri: item.img }}
                    style={{ width: winWidth, height: 200, }}/></View> : null
                const textView = item.step ? <Text style={styles.step}>{item.step}</Text> : null
                return <View key={index}>
                    {textView}
                    {imgView}
                </View>
            })}
        </View>
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    <View style={styles.imgContainer}>
                        <Image
                            source={{ uri: this.state.thumbnail }}
                            style={{ width: winWidth, height: 200, }}/>
                    </View>
                    <View>
                        <Text style={styles.desc}>{this.state.recipe.sumary && this.state.recipe.sumary}</Text>
                    </View>
                    <View>
                        <Text style={styles.title}>{this.state.recipe.title}</Text>
                    </View>
                    <View>
                        <Text style={styles.desc}>制作素材：</Text>
                        <Text
                            style={styles.desc}> {this.state.recipe.ingredients && this.state.recipe.ingredients.replace(/[["\]]/g, '')}</Text>
                    </View>
                    <View style={styles.methods}>
                        {this.renderMethod()}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 8,
    },
    imgContainer: {
        flex: 1,
        alignItems: 'center'
    },
    desc: {
        fontSize: 18,
        marginTop: 10,
        marginBottom: 10
    },
    title: {
        fontSize: 18,
        fontWeight: '600'
    },
    step: {
        fontSize: 18,
        margin: 8
    },
    methods: {
        flex: 1
    }
})