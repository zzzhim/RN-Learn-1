import React, { Component } from 'react'
import { Text, View, AsyncStorage, TextInput, Alert } from 'react-native'
import styles from './style'

const KEY = 'save_key'
export default class index extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showText: ''
        }
    }

    render() {
        return (
            <View style={ styles.container }>
                <Text>AsyncStorage 使用</Text>
                <TextInput
                    style={ styles.input }
                    onChangeText={ text => {
                        this.value = text
                    } }
                />
                <View style={  styles.input_container  }>
                        <Text onPress={ () => {
                            this.doSave()
                        } }>
                            存储
                        </Text>

                        <Text onPress={ () => {
                            this.doRemove()
                        } }>
                            删除
                        </Text>

                        <Text onPress={ () => {
                            this.getData()
                        } }>
                            获取
                        </Text>
                </View>
                <Text> { this.state.showText } </Text>
            </View>
        )
    }

    doSave() {
        AsyncStorage.setItem(KEY, this.value)
            .catch(err => {
                err && console.log(err)
            })
        Alert.alert('存储成功')

    }

    doRemove() {
        AsyncStorage.removeItem(KEY)
            .catch(err => {
                err && console.log(err)
            })
        Alert.alert('删除成功')
    }

    getData() {
        AsyncStorage.getItem(KEY)
            .then(value => {
                this.setState({
                    showText: value
                })
            })
            .catch(err => {
                err && console.log(err)
            })
    }
}
