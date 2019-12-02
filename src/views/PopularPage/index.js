import React, { Component } from 'react'
import { Text, View, Button, FlatList, RefreshControl, ActivityIndicator } from 'react-native'
import { styles } from './style'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation'
import { connect } from 'react-redux'
import actions from '../../action/index'
import PopularItem from '../../components/PopularItem/index'
import Toast from 'react-native-easy-toast'

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

const pageSize = 10
class PopularTab extends Component {

    constructor(props) {
        super(props)

        const { tabLabel } = this.props
        this.storeName = tabLabel
    }

    componentDidMount() {
        this.loadData()
    }

    loadData(loadMore) {
        const { onRefreshPopular, onLoadMorePopular } = this.props
        const store = this._store()
        const url = this.genFetchUrl(this.storeName)
        if(loadMore) {
            onLoadMorePopular(this.storeName, ++store.pageIndex, pageSize, store.items, callBack => {
                this.refs.toast.show('没有更多了')
            })
        }else {
            onRefreshPopular(this.storeName, url, pageSize)
        }
    }

    /**
     *
     * 获取当前页面有关的数据
     * @returns {*}
     */
    _store() {
        const { popular } = this.props
        let store = popular[this.storeName]
        if(!store) {
            store = {
                items: [],
                isLoading: false,
                projectModes: [], // 要显示的数据
                hideLoadingMore: true // 默认隐藏加载更多
            }
        }
        return store
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

    genIndicator() {
        return this._store().hideLoadingMore ? null : (
            <View style={ styles.indicatorContainer }>
                <ActivityIndicator style={ styles.indicator } size="large" color="#0000ff" />
                <Text>正在加载更多</Text>
            </View>
        )
    }

    render() {
        // const { popular } = this.props
        // let store = popular[this.storeName]
        // if(!store) {
        //     store = {
        //         items: [],
        //         isLoading: false
        //     }
        // }
        let store = this._store()

        return (
            <View style={ styles.container }>
                <FlatList
                    // data={ store.items }
                    data={ store.projectModes }
                    renderItem={ data => this.renderItem(data) }
                    keyExtractor={ item => "" + item.id }
                    refreshControl={ // 设置了此选项，则会在列表头部添加一个标准的RefreshControl控件，以便实现“下拉刷新”的功能。同时你需要正确设置refreshing属性。
                        <RefreshControl
                            title={ 'Loading' }
                            titleColor={ THEME_COLOR }
                            colors={ [ THEME_COLOR ] }
                            refreshing={ store.isLoading }
                            onRefresh={ () => this.loadData() }
                            tintColor={ THEME_COLOR }
                        />
                    }
                    ListFooterComponent={ () => this.genIndicator() } // 尾部组件。可以是 React Component, 也可以是一个 render 函数，或者渲染好的 element。
                    onEndReached={ () => { // 当列表被滚动到距离内容最底部不足onEndReachedThreshold的距离时调用。
                        setTimeout(() => {
                            if(this.canLoadMore) {
                                this.loadData(true)
                                this.canLoadMore = false
                            }
                        }, 100)
                    } }
                    onEndReachedThreshold={ 0.5 } // 列表可见的比例值,决定当距离内容最底部还有多远时触发onEndReached回调。
                    onMomentumScrollBegin={ () => this.canLoadMore = true } // 当一帧滚动开始时调用.
                />

                <Toast
                    ref={ 'toast'}
                    position={ 'center' }
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    popular: state.popular
})

const mapDispatchToProps = dispatch => ({
    onRefreshPopular: (storeName, url, pageSize) => dispatch(actions.onRefreshPopular(storeName, url, pageSize)),
    // onLoadPopurlarData: (storeName, url) => dispatch(actions.onLoadPopularData(storeName, url)),
    onLoadMorePopular: (storeName, pageIndex, pageSize, dataArray, callBack) => dispatch(actions.onLoadMorePopular(storeName, pageIndex, pageSize, dataArray, callBack))
})

// connect 只是一个function,并不一定要放在export后面,不一定非要用于默认导出组件
const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab)

export default PopularPage