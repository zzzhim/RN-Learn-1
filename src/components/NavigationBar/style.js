import {
    StyleSheet,
    Platform // 用来判断设备
} from 'react-native'
const NAV_BAR_HEIGHT_IOS = 44 // 导航栏IOS高度
const NAV_BAR_HEIGHT_ANDROID = 50 // 导航栏安卓高度
const STATUS_BAR_HEIGHT = 20 // 状态栏高度

export default StyleSheet.create({
    statusBar: {
        // 在安卓中已经默认保留高度
        height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0
    },
    title: {
        fontSize: 20,
        color: 'white'
    },
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID
    },
    navBarTitleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 40,
        right: 40,
        top: 0,
        bottom: 0
    },
    container: {
        backgroundColor: '#2196f3'
    },
    navBarButton: {
        alignItems: 'center'
    }
})