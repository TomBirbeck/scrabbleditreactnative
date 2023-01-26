import { FlatList, StyleSheet, View } from "react-native"
import {useContext} from 'react'
import WordContext from "../utilities/wordContext"
import DisplayWord from "./DisplayWord"

const Display = () => {
const word = useContext(WordContext)

    return(
        <View style={styles.list}>
            <FlatList
            horizontal={true}
            style={styles.list}
            data={word}
            keyExtractor={item=>item}
            renderItem={({item})=>(<DisplayWord letter={item}/>)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    list: {
        flex: 2
    }
})

export default Display