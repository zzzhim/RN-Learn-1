import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ViewPropTypes, Text, View, StatusBar } from 'react-native'
import styles  from './style'

// 设置状态栏可以接受的属性
const StatusBarShape = {
    barStyle: PropTypes.oneOf([ 'light-content', 'default' ]),
    hidden: PropTypes.bool,
    backgroundColor: PropTypes.string
}

export default class NavigationBar extends Component {
    /**
     *
     * 属性的类型检查
     * @static
     * @memberof NavigationBar
     */
    static propTypes = {
        style: ViewPropTypes.style,
        title: PropTypes.string,
        titleView: PropTypes.element,
        titleLayoutStyle: ViewPropTypes.style,
        hide: PropTypes.bool,
        statusBar: PropTypes.shape(StatusBarShape),
        rightButton: PropTypes.element,
        leftButton: PropTypes.element
    }

    /**
     *
     * 默认属性
     * @static
     * @memberof NavigationBar
     */
    static defaultProps = {
        statusBar: {
            barStyle: 'light-content',
            hidden: false
        }
    }

    constructor(props) {
        super(props)
    }

    render() {
        let statusBar = !this.props.statusBar.hidden ? (
            <View style={ styles.statusBar }>
                <StatusBar { ...this.props.statusBar } />
            </View>
        ) : null

        let titleView = this.props.titleView ? this.props.titleView : (
            <Text ellipsizeMode="head" numberOfLines={ 1 } style={ styles.title }>{ this.props.title }</Text>
        )

        let content = this.props.hide ? null : (
            <View style={ styles.navBar }>
                { this.getButtonElement(this.props.leftButton) }
                <View style={[ styles.navBarTitleContainer, this.props.titleLayoutStyle ]}>
                    { titleView }
                </View>
                { this.getButtonElement(this.props.rightButton) }
            </View>
        )

        return (
            <View style={[ styles.container, this.props.style ]}>
                { statusBar }
                { content }
            </View>
        )
    }

    getButtonElement(data) {
        return (
            <View style={ styles.navBarButton }>
                { data ? data : null }
            </View>
        )
    }
}