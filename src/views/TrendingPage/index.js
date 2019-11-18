import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { styles } from './style'

export default class TrendingPage extends Component {
    render() {
        const { navigation } = this.props

        return (
            <View style={ styles.container }>
                <Text style={ styles.welcome }> TrendingPage </Text>
                <Button
                    title={ '修改主题' }
                    onPress={ () => navigation.setParams(
                        {
                            theme: {
                                tintColor: 'blue',
                                updateTime: new Date().getTime()
                            }
                        }
                    ) }
                />
            </View>
        )
    }
}
