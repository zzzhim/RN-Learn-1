import React, { Component } from 'react'
import MyPage from '../views/MyPage/index'
import PopularPage from '../views/PopularPage/index'
import TrendingPage from '../views/TrendingPage/index'
import FavoritePage from '../views/FavoritePage/index'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs'

const TABS = { // 在这里配置页面的路由
    PopularPage: {
        screen: PopularPage,
        navigationOptions: {
            tabBarLabel: "最热",
            tabBarIcon: ({ tintColor, focused }) => (
                <MaterialIcons
                    name={ 'whatshot' }
                    size={ 26 }
                    style={{ color: tintColor }}
                />
            )
        }
    },
    TrendingPage: {
        screen: TrendingPage,
        navigationOptions: {
            tabBarLabel: "趋势",
            tabBarIcon: ({ tintColor, focused }) => (
                <Ionicons
                    name={ 'md-trending-up' }
                    size={ 26 }
                    style={{ color: tintColor }}
                />
            )
        }
    },
    FavoritePage: {
        screen: FavoritePage,
        navigationOptions: {
            tabBarLabel: "收藏",
            tabBarIcon: ({ tintColor, focused }) => (
                <MaterialIcons
                    name={ 'favorite' }
                    size={ 26 }
                    style={{ color: tintColor }}
                />
            )
        }
    },
    MyPage: {
        screen: MyPage,
        navigationOptions: {
            tabBarLabel: "我的",
            tabBarIcon: ({ tintColor, focused }) => (
                <Entypo
                    name={ 'user' }
                    size={ 26 }
                    style={{ color: tintColor }}
                />
            )
        }
    }
}

export default class DynamicTabNavigator extends Component {
    constructor(props) {
        super(props)
        console.disableYellowBox = true // 关闭黄色警告
    }

    _tabNavigator() {
        const { PopularPage, TrendingPage, FavoritePage, MyPage } = TABS
        const tabs = { PopularPage, TrendingPage, FavoritePage, MyPage }
        // PopularPage.navigationOptions.tabBarLabel = '最热0' // 动态修改Tab属性
        
        return createAppContainer(createBottomTabNavigator(
            tabs,
            {
                navigationOptions: {

                },
                tabBarComponent: TabBarComponent
            }
        ))
    }

    // 动态返回导航器
    render() {
        const Tab = this._tabNavigator()
        return <Tab />
    }
}

// 定制底部主题
class TabBarComponent extends Component {
    constructor(props) {
        super(props)

        this.theme = {
            tintColor: props.activeTintColor,
            updateTime: new Date().getTime()
        }
    }

    render() {
        const { routes, index } = this.props.navigation.state

        if(routes[index].params) {
            const { theme } = routes[index].params
            // 以最新的更新时间为主，防止被其他tab之前的修改覆盖掉
            if(theme && theme.updateTime > this.theme.updateTime) {
                this.theme = theme
            }
        }

        return (
            <BottomTabBar
                { ...this.props }
                activeTintColor={ this.theme.tintColor || this.props.activeTintColor }
            />
        )
    }
}