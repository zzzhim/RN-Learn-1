import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
// 显示HTML标签
import HTMLView from 'react-native-htmlview'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import styles from './style'

/**
 *
 * 公共列表组件
 * @returns
 * @memberof TrendingItem
 */
class TrendingItem extends Component {
    render() {
        const { item } = this.props
        if(!item) return null
        let favoriteButton = (
            <TouchableOpacity
                style={{ padding: 6 }}
                onPress={ () => {} }
                underlayColor={ 'transparent' }
                >
                <FontAwesome
                    name={ 'star-o' }
                    size={ 24 }
                    style={{ color: 'red' }}
                />
            </TouchableOpacity>
        )
        let description = '<p>' + item.description + '</p>'
        return (
            <TouchableOpacity
                onPress={ this.props.onSelect }
                >
                <View style={ styles.cell_container }>
                    <Text style={ styles.title }>{ item.fullName }</Text>
                    {/* <Text style={ styles.description }>{ item.description }</Text> */}
                    <HTMLView
                        value={ description }
                        onLinkPress={ url => {
                            
                        }}
                        stylesheet={{
                            p: styles.description,
                            a: styles.description
                        }}
                    />
                    <Text style={ styles.description }>{ item.meta }</Text>
                    <View style={ styles.row }>
                        <View style={ styles.row }>
                            <Text>Built by:</Text>
                            { item.contributors.map((result, i, arr) => {
                                return (
                                    <Image
                                        key={ i }
                                        style={{ width: 22, height: 22, margin: 2 }}
                                        source={{ uri: arr[i] }}
                                    />
                                )
                            }) }
                            
                        </View>
                        { favoriteButton }
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

export default TrendingItem