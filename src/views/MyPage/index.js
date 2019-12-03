import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { styles } from './style'
import { connect } from 'react-redux'
import { onThemeChange } from '../../action/theme'
import NavigationUtil from '../../navigator/NavigationUtil'
import NavigationBar from '../../components/NavigationBar/index'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'

const THEME_COLOR = '#678'

class MyPage extends Component {

    /**
     *
     * 我的页面右侧返回组件
     * @returns
     * @memberof MyPage
     */
    getRightButton() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={ () => {} }>
                    <View style={{ padding: 5, marginRight: 8 }}>
                        <Feather
                            name={ 'search' }
                            size={ 24 }
                            style={{ color: 'white' }}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    /**
     *
     * 我的页面左侧搜索组件
     * @param {*} callBack
     * @returns
     * @memberof MyPage
     */
    getLeftButton(callBack) {
        return (
            <TouchableOpacity onPress={ callBack } style={{ padding: 8, paddingLeft: 12 }}>
                <Ionicons
                    name={ 'ios-arrow-back' }
                    size={ 26 }
                    style={{ color: 'white' }}
                />
            </TouchableOpacity>
        )
    }

    render() {
        const statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle: 'light-content'
        }

        let navigationBar = (
            <NavigationBar
                title={ '我的' }
                statusBar={ statusBar }
                style={{
                    backgroundColor: THEME_COLOR
                }}
                rightButton={ this.getRightButton() }
                leftButton={ this.getLeftButton() }
            />
        )

        return (
            <View style={ styles.container }>
                { navigationBar }

                <Text style={ styles.welcome }> MyPage </Text>
                <Button
                    title={ '修改主题' }
                    onPress={ () => this.props.onThemeChange('black')}
                />

                <Text onPress={ () => {
                        NavigationUtil.goPage({}, 'DetailPage')
                    } }>
                    跳转到详情页面
                </Text>

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

                <Button
                    title="DataStoreDemoPage"
                    onPress={ () => {
                        NavigationUtil.goPage({}, 'DataStoreDemoPage')
                    } } 
                />
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    onThemeChange: theme => dispatch(onThemeChange(theme))
})

export default connect(null, mapDispatchToProps)(MyPage)