import { FlatList, StyleSheet, View, Text } from "react-native"
import {useContext, useState, useEffect} from 'react'
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
    const [playerTurn, setPlayerTurn] = useState({id: 0, name: '', score: 0})
    const [passScore, setPassScore] = useState(0)
    const [finalScoreMode, setFinalScoreMode] = useState(false)
    const [finalTiles, setFinalTiles] = useState<number[]>([]);

    useEffect(()=> {
        function isolate(player: {id: number, name: string, score: number}, passScore: number) {
          const newScore = player.score + passScore;
          let object = { ...player, score: newScore };
          if (player.id === 1) {
            setPlayer1(object);
          }
          if (player.id === 2) {
            setPlayer2(object);
          }
          if (player.id === 3) {
            setPlayer3(object);
          }
          if (player.id === 4) {
            setPlayer4(object);
          }
      }
        isolate(playerTurn, passScore)
        setPlayerTurn({id: 0, name: '', score: 0})
        setPassScore(0)
      }, [passScore])

    return(
        <View>
            <View style={styles.displayWord}>
            <FlatList
            horizontal={true}
            data={word[0]}
            keyExtractor={item=>item}
            renderItem={({item})=>(<DisplayWord letter={item}/>)}
            />
            </View>
            { playerTurn.id > 0 ? <View>
                <Text style={styles.turnText}>It's {playerTurn.name}'s turn</Text>
            </View>
            : finalScoreMode === true ? <View>
                <Text style={styles.turnText}>Final Score Mode Active</Text>
            </View>
            : null
            }
            <View>
                <WordScore
                setPassScore={setPassScore}
                finalScoreMode={finalScoreMode}
                setFinalScoreMode={setFinalScoreMode}
                finalTiles={finalTiles}
                setFinalTiles={setFinalTiles}
                />
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
            playerTurn={playerTurn}
            setPlayerTurn={setPlayerTurn}
            passScore={passScore}
            />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    displayWord :{
        height: 50,
    },
    turnText: {
        color: 'white',
        textAlign: 'center',
    }
})

export default Display