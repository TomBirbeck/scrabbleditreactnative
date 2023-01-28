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

const RADIO: string[] = [
    'player1',
    'player2',
    'player3',
    'player4'
]

const Scoreboard = ({player1, player2, player3, player4, setPlayer1, setPlayer2, setPlayer3, setPlayer4, finals} : ScoreboardProps) => {
    const players = [player1, player2, player3, player4]
    const [player, setPlayer] = useState('')
    const [playerTurn, setPlayerTurn] = useState('')
    const [newName, setNewName] = useState('')
    const [winner, setWinner] = useState('');
    const [finalA, setFinalA] = useState(0);
    const [finalB, setFinalB] = useState(0);
    const [finalC, setFinalC] = useState(0);
    const [finalD, setFinalD] = useState(0);
    const [finalScores, setFinalScores] = useState<number[]>([0,0,0,0])

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

    return (
<View>
    <View>
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
            <Text style={[styles.bodyText, styles.playerButton]}>{player.item.name}</Text>
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
        height: 170
    },
    tableHeader: {
        flexDirection: 'row',
        width: 300,
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
    radioContainer: {
        flexDirection: 'row',
        marginBottom: 5,
        alignItems: 'center'
    },
    setNameButton: {
        backgroundColor: '#B1ECFA',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
        padding: 4,
    },
    nameInput: {
            borderWidth: 2,
            color: 'white',
            borderColor: '#DBB684',
            padding: 10,
            borderRadius: 5,
            marginBottom: 5,
        },


})

export default Scoreboard