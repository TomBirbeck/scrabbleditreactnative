import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, FlatList, TouchableOpacity, TextInput} from 'react-native'
import RadioButton from './RadioButton';

type PLAYER = 
    { id: number;
         name: string;
          score: number; }

type PLAYERSETTER = 
    React.Dispatch<React.SetStateAction<{
        id: number;
        name: string;
        score: number;
    }>>

interface ScoreboardProps {
    player1: PLAYER;
    player2: PLAYER;
    player3: PLAYER;
    player4: PLAYER;
    setPlayer1: PLAYERSETTER;
    setPlayer2: PLAYERSETTER;
    setPlayer3: PLAYERSETTER;
    setPlayer4: PLAYERSETTER;
    finals: number[];
    playerTurn: PLAYER;
    setPlayerTurn: PLAYERSETTER;
    passScore: number;
    setFinalScoreMode: React.Dispatch<React.SetStateAction<boolean>>;
    finalScoreMode: boolean;
    setWinner: React.Dispatch<React.SetStateAction<string>>;
}

const RADIO: string[] = [
    'player1',
    'player2',
    'player3',
    'player4'
]

const Scoreboard = ({player1, player2, player3, player4, setPlayer1, setPlayer2, setPlayer3, setPlayer4, finals, playerTurn, setPlayerTurn, passScore, setFinalScoreMode, finalScoreMode, setWinner} : ScoreboardProps) => {
    const players = [player1, player2, player3, player4]
    const [player, setPlayer] = useState('')
    const [newName, setNewName] = useState('')
    const [finalA, setFinalA] = useState(0);
    const [finalB, setFinalB] = useState(0);
    const [finalC, setFinalC] = useState(0);
    const [finalD, setFinalD] = useState(0);
    const [finalScores, setFinalScores] = useState<number[]>([0,0,0,0])
    const [openNames, setOpenNames] = useState(false)

    useEffect(()=>{
        setFinalScores([finalA, finalB, finalC, finalD])
    },[finalA, finalB, finalC, finalD])

    function handleSubmitPlayer(object: string, player: string) {
            if (player === 'player1'){
        if (object.length > 0) {
                const playerstuff = { ...player1, name: object };
                setPlayer1(playerstuff);
                setNewName('');
            } else {
                setPlayer1({ ...player1, name: player1.name });
            }
        } else if (player === 'player2') {
            if (object.length > 0) {
                const playerstuff = { ...player2, name: object };
                setPlayer2(playerstuff);
                setNewName('');
            } else {
                setPlayer2({ ...player2, name: player2.name });
            }
        } else if (player === 'player3') {
            if (object.length > 0) {
                const playerstuff = { ...player3, name: object };
                setPlayer3(playerstuff);
                setNewName('');
            } else {
                setPlayer3({ ...player3, name: player3.name });
            }
        } else if (player === 'player4') {
            if (object.length > 0) {
                const playerstuff = { ...player4, name: object };
                setPlayer4(playerstuff);
                setNewName('');
            } else {
                setPlayer4({ ...player4, name: player4.name });
            }
        }        
    }

    function handleWinner(a: PLAYER, b: PLAYER, c: PLAYER, d: PLAYER, finalTiles: number[]) {
        const extra = finalTiles.reduce(function (a, b) {
          return a + b;
        }, 0);
        let finalA = 0;
        let finalB = 0;
        let finalC = 0;
        let finalD = 0;
        if (finalTiles[0] === 0) {
          finalA = a.score - finalTiles[0] + extra;
        }
        setFinalA(finalA);
        if (finalTiles[0] !== 0 && finalTiles[0]) {
          finalA = a.score - finalTiles[0];
          if (!Number.isNaN(finalA)) {
            setFinalA(finalA);
          }
          if (Number.isNaN(finalA)) {
            setFinalA(0);
          }
        }
        if (finalTiles[1] === 0) {
          finalB = b.score - finalTiles[1] + extra;
        }
        setFinalB(finalB);
        if (finalTiles[1] !== 0 && finalTiles[1]) {
          finalB = b.score - finalTiles[1];
          if (!Number.isNaN(finalB)) {
            setFinalB(finalB);
          }
          if (Number.isNaN(finalB)) {
            setFinalB(0);
          }
        }
        if (finalTiles[2] === 0) {
          finalC = c.score - finalTiles[2] + extra;
        }
        setFinalC(finalC);
        if (finalTiles[2] !== 0 && finalTiles[2]) {
          finalC = c.score - finalTiles[2];
          if (!Number.isNaN(finalC)) {
            setFinalC(finalC);
          }
          if (Number.isNaN(finalC)) {
            setFinalC(0);
          }
        }
        if (finalTiles[3] === 0) {
          finalD = d.score - finalTiles[3] + extra;
        }
        setFinalD(finalD);
        if (finalTiles[3] !== 0) {
          finalD = d.score - finalTiles[3];
          if (!Number.isNaN(finalD)) {
            setFinalD(finalD);
          }
          if (Number.isNaN(finalD)) {
            setFinalD(0);
          }
        }
        const players = [
            { name: a.name, score: finalA },
            { name: b.name, score: finalB },
            { name: c.name, score: finalC },
            { name: d.name, score: finalD },
          ];
          const winner = players.sort((a, b) => {
            return b.score - a.score;
          })[0];
          setWinner(winner.name);
      
        //   console.log('final scores', finalA, finalB, finalC, finalD);
        //   console.log('winner', winner);
    }

    return (
<View>
{ openNames && <View>
        <TextInput style={styles.nameInput} value={newName} onChangeText={setNewName}/>
        <View style={styles.radioContainer}>
<FlatList
    horizontal={true}
    data={RADIO}
    keyExtractor={item=>item}
    renderItem={(radio)=>(<RadioButton setPlayer={setPlayer} player={radio.item}/>)}/>
<TouchableOpacity onPress={()=>{handleSubmitPlayer(newName, player)}}>
    <Text style={styles.setNameButton}>set name</Text>
</TouchableOpacity>
        </View>
    </View> 
    }
    <View style={styles.topButtonContainer}>
<TouchableOpacity onPress={()=>{setOpenNames(!openNames)}}>
        <Text style={styles.toggleName}>Change Names</Text>
    </TouchableOpacity>
        <TouchableOpacity onPress={()=>{handleWinner(player1, player2, player3, player4, finals)}}>
            <Text style={styles.endGameButton}>End Game</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {setFinalScoreMode(!finalScoreMode)}}>
        <Text style={styles.endGameButton}>Final Tiles</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.table}>
    <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Player</Text>
        <Text style={styles.headerText}>Score</Text>
        <Text style={styles.headerText}>Final Tiles</Text>
        <Text style={styles.headerText}>Final Score</Text>
    </View>
        <FlatList
        data={players}
        keyExtractor={(player) => player.name}
        renderItem={(player)=>(
            <View style={styles.tableBody}>
                <TouchableOpacity onPress={() => {setPlayerTurn(player.item)}}>
            <Text style={[styles.bodyText, styles.playerButton]}>{player.item.name}</Text>
                </TouchableOpacity>
            <Text style={styles.bodyText}>{player.item.score}</Text>
            <Text style={styles.bodyText}>{finals[player.item.id - 1]}</Text>
            <Text style={styles.bodyText}>{finalScores[player.item.id - 1]}</Text>
            </View>
        )}
         />       
    </View>
</View>
    )
}

const styles = StyleSheet.create({
    table: {
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#DBBA84',
        height: 170,
        width: 300,
    },
    tableHeader: {
        flexDirection: 'row',
        width: 298,
        justifyContent: 'space-evenly',
        borderBottomWidth: 1,
        borderBottomColor: '#DBBA84',
    },
    headerText: {
        color: 'white',
        width: 70,
        textAlign: 'center'
    },
    tableBody: {
        flexDirection: 'row',
        width: 298,
        justifyContent:'space-evenly',
    },
    bodyText: {
        color: 'white',
        width: 70,
        textAlign: 'center',
        marginTop: 4,
        padding: 5,
    },
    playerButton : {
        backgroundColor: '#29809E',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5
    },
    radioContainer: {
        flexDirection: 'row',
        marginBottom: 5,
        alignItems: 'center'
    },
    setNameButton: {
        backgroundColor: '#B1ECFA',
        width: 80,
        textAlign: 'center',
        borderRadius: 5,
        padding: 5,
    },
    nameInput: {
            borderWidth: 2,
            color: 'white',
            borderColor: '#DBB684',
            padding: 10,
            borderRadius: 5,
            marginBottom: 5,
        },
        toggleName: {
            backgroundColor: '#B1ECFA',
            borderRadius: 5,
            textAlign: 'center',
            marginBottom: 2,
            width: 110,
            padding: 5
        }, 
        endGameButton: {
            borderRadius: 5,
            backgroundColor: '#F7E441',
            textAlign: 'center',
            width: 90,
            padding: 5,
            marginBottom: 2,
        },
        topButtonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 4,
        }

})

export default Scoreboard