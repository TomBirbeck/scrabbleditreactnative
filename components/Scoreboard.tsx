import {useState, useEffect} from 'react'
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
    finals: number[]
}

const RADIO = [
    'player1',
    'player2',
    'player3',
    'player4'
]

const Scoreboard = ({player1, player2, player3, player4, setPlayer1, setPlayer2, setPlayer3, setPlayer4, finals} : ScoreboardProps) => {
    const players = [player1, player2, player3, player4]
    const [player, setPlayer] = useState('')
    const [winner, setWinner] = useState('');
    const [finalA, setFinalA] = useState(0);
    const [finalB, setFinalB] = useState(0);
    const [finalC, setFinalC] = useState(0);
    const [finalD, setFinalD] = useState(0);
    const [finalScores, setFinalScores] = useState<number[]>([0,0,0,0])

    useEffect(()=>{
        setFinalScores([finalA, finalB, finalC, finalD])
    },[finalA, finalB, finalC, finalD])

    function handleSubmitPlayer1(object: string) {
        if (object.length > 0) {
          const playerstuff = { ...player1, name: object };
          setPlayer1(playerstuff);
          setPlayer('');
        } else {
          setPlayer1({ ...player1, name: player1.name });
        }
      }

    return (
        <View>
{/* <View style={styles.table}>
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
            <Text style={[styles.bodyText, styles.playerButton]}>{player.item.name}</Text>
            <Text style={styles.bodyText}>{player.item.score}</Text>
            <Text style={styles.bodyText}>{finals[player.item.id - 1]}</Text>
            <Text style={styles.bodyText}>{finalScores[player.item.id - 1]}</Text>
            </View>
        )}
         />       
</View> */}
<FlatList
    horizontal={true}
    data={RADIO}
    keyExtractor={item=>item}
    renderItem={(radio)=>(
        <View style={styles.radioButtons}>
            <Text style={styles.radioText}>{radio.item}</Text>
            <RadioButton/>
        </View>
         )}
         />
<TextInput value={player} onChangeText={setPlayer}/>
<TouchableOpacity onPress={()=>{handleSubmitPlayer1(player)}}>
    <Text style={styles.bodyText}>set player 1</Text>
</TouchableOpacity>
</View>
    )
}

const styles = StyleSheet.create({
    table: {
        borderWidth: 4,
        borderColor: '#DBBA84',
        height: 170
    },
    tableHeader: {
        flexDirection: 'row',
        width: 300,
        justifyContent: 'space-evenly',
        borderBottomWidth: 1,
        borderBottomColor: '#DBBA84'
    },
    headerText: {
        color: 'white',
        width: 70,
        textAlign: 'center'
    },
    tableBody: {
        flexDirection: 'row',
        width: 300,
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
    radioButtons: {
    marginHorizontal: 2,
    alignItems: 'center'
    },
    radioText :{
        color: 'white',
        marginBottom: 4,
    }

})

export default Scoreboard