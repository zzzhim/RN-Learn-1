import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { styles } from './style'
import { connect } from 'react-redux'
import actions, { onThemeChange } from '../../action/theme/index'

class FavoritePage extends Component {
    render() {
        return (
            <View style={ styles.container }>
                <Text style={ styles.welcome }> FavoritePage </Text>
                <Button
                    title={ '修改主题' }
                    onPress={ () => this.props.onThemeChange('green') }
                />
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    onThemeChange: theme => dispatch(onThemeChange(theme))
})

export default connect(null, mapDispatchToProps)(FavoritePage)