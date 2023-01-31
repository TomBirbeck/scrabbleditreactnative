import { FlatList, StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from "react-native"
import {useContext, useState, useEffect} from 'react'
import WordContext from "../utilities/wordContext"
import DisplayWord from "../components/DisplayWord"
import Scoreboard from "../components/Scoreboard"
import WordScore from "../components/WordScore"
import Header from "../components/Header"

const Display = ({navigation}: any) => {
    const word = useContext(WordContext)
    const [player1, setPlayer1] = useState({ id: 1, name: 'player 1', score: 0 });
    const [player2, setPlayer2] = useState({ id: 2, name: 'player 2', score: 0 });
    const [player3, setPlayer3] = useState({ id: 3, name: 'player 3', score: 0 });
    const [player4, setPlayer4] = useState({ id: 4, name: 'player 4', score: 0 });
    const [playerTurn, setPlayerTurn] = useState({id: 0, name: '', score: 0})
    const [passScore, setPassScore] = useState(0)
    const [finalScoreMode, setFinalScoreMode] = useState(false)
    const [finalTiles, setFinalTiles] = useState<number[]>([]);
    const [winner, setWinner] = useState('');

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
      <SafeAreaView style={styles.container}>
        <View style={styles.aboutContainer}>
      <TouchableOpacity onPress={() => {navigation.navigate('About')}}>
          <View style={styles.aboutButton}>
            <Text style={styles.aboutText}>About</Text>
          </View>
          </TouchableOpacity>
          </View>
      <Header/>
        <View style={styles.display}>
            <View style={styles.displayWord}>
              {finalScoreMode && winner ?<View style={styles.winnerBox}><Text style={styles.winnerText}>Congratulations {winner}, you are the winner!</Text></View>
              :
            <FlatList
            horizontal={true}
            data={word[0]}
            keyExtractor={item=>item}
            renderItem={({item})=>(<DisplayWord letter={item}/>)}
            />
              }
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
            setFinalScoreMode={setFinalScoreMode}
            finalScoreMode={finalScoreMode}
            setWinner={setWinner}
            />
            </View>
        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#26584C',
    alignItems: 'center',
    marginTop: 20,
  },
  display: {
    flex: 5,
  },
  aboutContainer: {
    width: 310,
    paddingTop: 2,
  },
  aboutButton: {
alignSelf: 'flex-end',
paddingVertical: 2,
paddingHorizontal: 5,
  },
  aboutText: {
    textAlign:'center',
    color: 'white',
    fontSize: 16
  },
    displayWord :{
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    turnText: {
        color: 'white',
        textAlign: 'center',
    },
    winnerBox:{
      backgroundColor: '#F7E441',
      width: 300,
      height: 40,
      borderWidth: 2,
      borderColor: '#DBBA84',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 5,
      borderRadius: 5,
    },
    winnerText: {
      fontSize: 14
    }
})

export default Display