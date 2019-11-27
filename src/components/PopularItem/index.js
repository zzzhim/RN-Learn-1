import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import styles from './style'

/**
 *
 * 公共列表组件
 * @returns
 * @memberof PopularItem
 */
class PopularItem extends Component {
    render() {
        const { item } = this.props
        if(!item || !item.owner) return null
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
        return (
            <TouchableOpacity
                onPress={ this.props.onSelect }
                >
                <View style={ styles.cell_container }>
                    <Text style={ styles.title }>{ item.full_name }</Text>
                    <Text style={ styles.description }>{ item.description }</Text>
                    <View style={ styles.row }>
                        <View style={ styles.row }>
                            <Text>Author:</Text>
                            <Image
                                style={{ width: 22, height: 22 }}
                                source={{ uri: item.owner.avatar_url }}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>Start:</Text>
                            <Text>{ item.stargazers_count }</Text>
                        </View>
                        { favoriteButton }
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

export default PopularItem