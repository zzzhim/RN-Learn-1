import React, { Component } from 'react'
import { Provider } from 'react-redux'
import AppNavigator from './navigator/AppNavigators'
import store from './store/index'

export default class App extends Component {
    render() {
        /**
         * 将 store 传递给 APP 框架 
         */
        return (
            <Provider store={ store }>
                <AppNavigator />
            </Provider>
        )
    }
}