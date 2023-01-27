import {useState} from 'react'
import {Text, View, StyleSheet, FlatList} from 'react-native'

type PLAYER = 
    { id: number;
         name: string;
          score: number; }


interface ScoreboardProps {
    player1: PLAYER;
    player2: PLAYER;
    player3: PLAYER;
    player4: PLAYER;
    finals?: number[]
}


const FINALS = [
    {tiles: 1, score: 0},
    {tiles: 2, score: 0},
    {tiles: 3, score: 0},
    {tiles: 4, score: 0},
]



const Scoreboard = ({player1, player2, player3, player4} : ScoreboardProps) => {
    const players = [player1, player2, player3, player4]
    const [winner, setWinner] = useState('');
    const [finalA, setFinalA] = useState(0);
    const [finalB, setFinalB] = useState(0);
    const [finalC, setFinalC] = useState(0);
    const [finalD, setFinalD] = useState(0);
    const [finalScores, setFinalScores] = useState([])
    return (
        <View>
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
            <Text style={styles.bodyText}>{FINALS[player.item.id - 1].tiles}</Text>
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
    }

})

export default Scoreboard