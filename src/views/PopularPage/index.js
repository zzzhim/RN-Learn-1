import React, { Component } from 'react'
import { Text, View, Button, FlatList, RefreshControl } from 'react-native'
import { styles } from './style'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation'
import { connect } from 'react-redux'
import actions from '../../action/index'
import PopularItem from '../../components/PopularItem/index'

const URL = 'https://api.github.com/search/repositories?q='
const QUERY_STR = '&sort=stars'
const THEME_COLOR = 'red'

class PopularPage extends Component {
    constructor(props) {
        super(props)
        this.tabNames = [ 'Java', 'Android', 'IOS', 'React', 'React Native', 'PHP', 'Vue' ]
    }

    _genTabs() {
        const tabs = {}
        this.tabNames.forEach((item, index) => {
            tabs[`tab${index}`] = {
                // screen: props => <PopularTab { ...props } tabLabel={ item }/>,
                screen: props => <PopularTabPage { ...props } tabLabel={ item }/>,
                navigationOptions: {
                    title: item
                }
            }
        })

        return tabs
    }

    render() {
        // const { navigation } = this.props

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
            </View>
        )
    }
}

class PopularTab extends Component {

    constructor(props) {
        super(props)

        const { tabLabel } = this.props
        this.storeName = tabLabel
    }

    componentDidMount() {
        this.loadData()
    }

    loadData() {
        const { onLoadPopurlarData } = this.props
        const url = this.genFetchUrl(this.storeName)
        onLoadPopurlarData(this.storeName, url)
    }

    genFetchUrl(key) {
        return URL + key + QUERY_STR
    }

    renderItem(data) {
        const { item } = data

        // return (
        //     <View style={{ marginBottom: 10 }}>
        //         <Text style={{ backgroundColor: '#faa' }}>
        //             { JSON.stringify(item) }
        //         </Text>
        //     </View>
        // )

        return (
            <PopularItem
                item={ item }
                onSelect={ () => {} }
            />
        )
    }

    render() {
        const { popular } = this.props
        let store = popular[this.storeName]
        if(!store) {
            store = {
                items: [],
                isLoading: false
            }
        }

        return (
            <View style={ styles.container }>
                <FlatList
                    data={ store.items }
                    renderItem={ data => this.renderItem(data) }
                    keyExtractor={ item => "" + item.id }
                    refreshControl={
                        <RefreshControl
                            title={ 'Loading' }
                            titleColor={ THEME_COLOR }
                            colors={ [ THEME_COLOR ] }
                            refreshing={ store.isLoading }
                            onRefresh={ () => this.loadData() }
                            tintColor={ THEME_COLOR }
                        />
                    }
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    popular: state.popular
})

const mapDispatchToProps = dispatch => ({
    onLoadPopurlarData: (storeName, url) => dispatch(actions.onLoadPopularData(storeName, url))
})

const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab)

export default PopularPage