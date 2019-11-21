import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    input_container: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    input: {
        width: 375,
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        marginLeft: 5,
    }
})