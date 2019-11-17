import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { styles } from './style'

export default class MyPage extends Component {
    render() {
        return (
            <View style={ styles.container }>
                <Text style={ styles.welcome }> MyPage </Text>
            </View>
        )
    }
}
