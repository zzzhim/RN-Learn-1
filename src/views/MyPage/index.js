import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { styles } from './style'
import { connect } from 'react-redux'
import { onThemeChange } from '../../action/theme'


class MyPage extends Component {
    render() {
        return (
            <View style={ styles.container }>
                <Text style={ styles.welcome }> MyPage </Text>
                <Button
                    title={ '修改主题' }
                    onPress={ () => this.props.onThemeChange('black')}
                />
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    onThemeChange: theme => dispatch(onThemeChange(theme))
})

export default connect(null, mapDispatchToProps)(MyPage)