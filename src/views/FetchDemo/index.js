import React, { Component } from 'react'
import { Text, View, TextInput, Button } from 'react-native'
import styles from './style'

export default class index extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showText: ''
        }
    }

    loadData() {
        let url = `https://api.github.com/search/repositories?q=${this.searchKey}`
        fetch(url)
            .then(response => response.text())
            .then(responseText => {
                this.setState({
                    showText: responseText
                })
            })
    }

    loadData2() {
        let url = `https://api.github.com/search/repositories?q=${this.searchKey}`
        fetch(url)
            .then(response => {
                if(response.ok) {
                    return response.text()
                }
                throw new Error('Network response was not ok')
            })
            .then(responseText => {
                this.setState({
                    showText: responseText
                })
            })
            .catch(e => {
                this.setState({
                    showText: e.toString()
                })
            })
    }

    render() {
        return (
            <View style={ styles.container }>
                <Text>Fetch 使用</Text>
                <View style={ styles.input_container }>
                    <TextInput
                        style={ styles.input }
                        onChangeText={ text => {
                            this.searchKey = text
                        } }
                    />
                    <Button
                        title="获取"
                        onPress={ () => {
                            this.loadData2()
                        } }
                    />
                </View>
                <Text> { this.state.showText } </Text>
            </View>
        )
    }
}
