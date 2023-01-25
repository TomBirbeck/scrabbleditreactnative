import {View, Text, StyleSheet} from 'react-native'

const DisplayWord = (letter) => {
    return (
        <View style={styles.box}>
            <Text style={styles.boxText}>{letter.letter}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        width: 30,
        height: 30,
        backgroundColor: '#DBB684',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginRight: 3,
    },
    boxText: {
        fontSize: 18,
        fontWeight: 'bold',
    }
})

export default DisplayWord