import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { styles } from './style'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation'
import NavigationUtil from '../../navigator/NavigationUtil'

export default class PopularPage extends Component {
    constructor(props) {
        super(props)
        this.tabNames = [ 'Java', 'Android', 'IOS', 'React', 'React Native', 'PHP', 'Vue' ]
    }

    _genTabs() {
        const tabs = {}
        this.tabNames.forEach((item, index) => {
            tabs[`tab${index}`] = {
                screen: props => <PopularTab { ...props } tabLabel={ item }/>,
                navigationOptions: {
                    title: item
                }
            }
        })

        return tabs
    }

    render() {
        const { navigation } = this.props

        // 设置顶部导航
        const TabNavigator = createAppContainer(createMaterialTopTabNavigator(
            this._genTabs(),
            {
                tabBarOptions: {
                    tabStyle: styles.tabStyle,
                    upperCaseLabel: false,
                    scrollEnabled: true,
                    style: {
                        backgroundColor: '#a67'
                    },
                    indicatorStyle: styles.indicatorStyle,
                    labelStyle: styles.labelStyle
                }
            }
        ))

        return (
            <View style={ styles.container }>
                <TabNavigator />
                <Text onPress={ () => {
                    NavigationUtil.goPage({}, 'DetailPage')
                } }>跳转到详情页面</Text>

                <Button
                    title="FetchDemo"
                    onPress={ () => {
                        NavigationUtil.goPage({}, 'FetchDemo')
                    } } 
                    
                />

                <Button
                    title="AsyncStorage"
                    onPress={ () => {
                        NavigationUtil.goPage({}, 'AsyncStorage')
                    } } 
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
