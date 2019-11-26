import React, { Component } from 'react'
import { Text, View, AsyncStorage, TextInput, Alert } from 'react-native'
import styles from './style'
import DataStore from '../../expand/dao/DataStore'

const KEY = 'save_key'
export default class DataStoreDemoPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showText: ''
        }

        this.dataStore = new DataStore()
    }

    render() {
        return (
            <View style={ styles.container }>
                <Text>离线缓存框架设计</Text>
                <TextInput
                    style={ styles.input }
                    onChangeText={ text => {
                        this.value = text
                    } }
                />
                <View style={  styles.input_container  }>
                        <Text onPress={ () => {
                            this.loadData()
                        } }>
                            获取
                        </Text>
                </View>
                <Text> { this.state.showText } </Text>
            </View>
        )
    }

    loadData() {
        let url = `https://api.github.com/search/repositories?q=${this.value}`
        this.dataStore.fetchData(url)
            .then(data => {
                let showData = `初次数据加载时间:${ new Date(data.timestamp) }\n${ JSON.stringify(data.data) }`
                this.setState({
                    showText: showData
                })
            })
            .catch(error => {
                error && console.log(error.toString())
            })
    }
}
