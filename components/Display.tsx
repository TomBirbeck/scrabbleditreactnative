import { FlatList, StyleSheet, View } from "react-native"
import {useContext, useState} from 'react'
import WordContext from "../utilities/wordContext"
import DisplayWord from "./DisplayWord"
import Scoreboard from "./Scoreboard"
import WordScore from "./WordScore"

const Display = () => {
    const word = useContext(WordContext)
    const [player1, setPlayer1] = useState({ id: 1, name: 'player 1', score: 0 });
    const [player2, setPlayer2] = useState({ id: 2, name: 'player 2', score: 0 });
    const [player3, setPlayer3] = useState({ id: 3, name: 'player 3', score: 0 });
    const [player4, setPlayer4] = useState({ id: 4, name: 'player 4', score: 0 });
    const [finalTiles, setFinalTiles] = useState([]);
    // const [context, setContext] = useState([''])

    return(
        // <WordContext.Provider value={[context, setContext]}>
        <View style={styles.list}>
            <View>
            <FlatList
            horizontal={true}
            style={styles.list}
            data={word[0]}
            keyExtractor={item=>item}
            renderItem={({item})=>(<DisplayWord letter={item}/>)}
            />
            </View>
            <View>
                <WordScore/>
            </View>
            <View>
            <Scoreboard 
            player1={player1}
            player2={player2}
            player3={player3}
            player4={player4}
            setPlayer1={setPlayer1}
            setPlayer2={setPlayer2}
            setPlayer3={setPlayer3}
            setPlayer4={setPlayer4}
            finals={finalTiles}
            />
            </View>
        </View>
        // </WordContext.Provider>
    )
}

const styles = StyleSheet.create({
    list: {
        flex: 1
    },
})

export default Display