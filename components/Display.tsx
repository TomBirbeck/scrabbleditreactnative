import { FlatList, SafeAreaView, StyleSheet, View } from "react-native"
import {useContext, useState} from 'react'
import WordContext from "../utilities/wordContext"
import DisplayWord from "./DisplayWord"
import Scoreboard from "./Scoreboard"

const Display = () => {
const word = useContext(WordContext)
const [player1, setPlayer1] = useState({ id: 1, name: 'player 1', score: 0 });
const [player2, setPlayer2] = useState({ id: 2, name: 'player 2', score: 0 });
const [player3, setPlayer3] = useState({ id: 3, name: 'player 3', score: 0 });
const [player4, setPlayer4] = useState({ id: 4, name: 'player 4', score: 0 });
const [finalTiles, setFinalTiles] = useState([]);


    return(
        <View style={styles.list}>
            <FlatList
            horizontal={true}
            style={styles.list}
            data={word}
            keyExtractor={item=>item}
            renderItem={({item})=>(<DisplayWord letter={item}/>)}
            />
            <Scoreboard 
            player1={player1}
            player2={player2}
            player3={player3}
            player4={player4}
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