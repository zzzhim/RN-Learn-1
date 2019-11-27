import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { styles } from './style'
import { connect } from 'react-redux'
import { onThemeChange } from '../../action/theme'
import NavigationUtil from '../../navigator/NavigationUtil'

class MyPage extends Component {
    render() {
        return (
            <View style={ styles.container }>
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