import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { styles } from './style'

export default class PopularPage extends Component {
    render() {
        return (
            <View style={ styles.container }>
                <Text style={ styles.welcome }> PopularPage </Text>
            </View>
        )
    }
}
