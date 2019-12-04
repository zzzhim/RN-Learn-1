import React, { Component } from 'react'
import MyPage from '../views/MyPage/index'
import PopularPage from '../views/PopularPage/index'
import TrendingPage from '../views/TrendingPage/index'
import FavoritePage from '../views/FavoritePage/index'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createAppContainer } from 'react-navigation'
// import { DeviceInfo } from 'react-native'
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs'
import { connect } from 'react-redux'

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

class DynamicTabNavigator extends Component {
    constructor(props) {
        super(props)
        console.disableYellowBox = true // 关闭黄色警告
    }

    _tabNavigator() {
        if(this.Tabs) {
            return this.Tabs
        }

        const { PopularPage, TrendingPage, FavoritePage, MyPage } = TABS
        const tabs = { PopularPage, TrendingPage, FavoritePage, MyPage }
        // PopularPage.navigationOptions.tabBarLabel = '最热0' // 动态修改Tab属性
        
        return createAppContainer(createBottomTabNavigator(
            tabs,
            {
                navigationOptions: {

                },
                tabBarComponent: props => {
                    return <TabBarComponent { ...props } theme={ this.props.theme } />
                }
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
    render() {
        return (
            <BottomTabBar
                { ...this.props }
                activeTintColor={ this.props.theme }
            />
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme
})

export default connect(mapStateToProps)(DynamicTabNavigator)