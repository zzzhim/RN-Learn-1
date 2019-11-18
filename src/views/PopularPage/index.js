import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { styles } from './style'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation'

export default class PopularPage extends Component {
    render() {
        // 设置顶部导航
        const TabNavigator = createAppContainer(createMaterialTopTabNavigator(
            {
                PopularTab1: {
                    screen: PopularTab,
                    navigationOptions: {
                        title: 'Tab1'
                    }
                },
                PopularTab2: {
                    screen: PopularTab,
                    navigationOptions: {
                        title: 'Tab2'
                    }
                }
            }
        ))

        return (
            <View style={ styles.container }>
                <TabNavigator />
            </View>
        )
    }
}

class PopularTab extends Component {
    render() {
        return (
            <View style={ styles.container }>
                <Text>PopularPage</Text>
            </View>
        )
    }
}
