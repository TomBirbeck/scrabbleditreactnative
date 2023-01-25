import { FlatList, Text, StyleSheet } from "react-native"
import DisplayWord from "./DisplayWord"

const letters = [
    'A',
    'B',
    'C'
]

const Display = () => {
    return(
        <FlatList
        horizontal={true}
        style={styles.list}
        data={letters}
        keyExtractor={item=>item}
        renderItem={({item})=>(<DisplayWord letter={item}/>)}
        />
    )
}

const styles = StyleSheet.create({
    list: {
    }
})

export default Display