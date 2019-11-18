import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { styles } from './style'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation'

export default class PopularPage extends Component {
    render() {
        const { navigation } = this.props

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
                <Button
                    title={ '修改主题' }
                    onPress={ () => navigation.setParams(
                        {
                            theme: {
                                tintColor: 'red',
                                updateTime: new Date().getTime()
                            }
                        }
                    ) }
                />
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
