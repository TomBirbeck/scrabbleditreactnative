import {Text, View, StyleSheet, FlatList} from 'react-native'
import { useState } from 'react'

const PLAYERS = [
    { id: 1, name: 'player 1', score: 0 },
   {id: 2, name: 'player 2', score: 0 },
   {id: 3, name: 'player 3', score: 0 },
{ id: 4, name: 'player 4', score: 0 },
]
const FINALS = [
    {tiles: 1, score: 0},
    {tiles: 2, score: 0},
    {tiles: 3, score: 0},
    {tiles: 4, score: 0},
]



const Scoreboard = () => {
    return (
<View style={styles.table}>
    <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Player</Text>
        <Text style={styles.headerText}>Score</Text>
        <Text style={styles.headerText}>Final Tiles</Text>
        <Text style={styles.headerText}>Final Score</Text>
    </View>
        <FlatList
        data={PLAYERS}
        keyExtractor={(PLAYERS) => PLAYERS.name}
        renderItem={(player)=>(
            <View style={styles.tableBody}>
            <Text style={styles.bodyText}>{player.item.name}</Text>
            <Text style={styles.bodyText}>{player.item.score}</Text>
            <Text style={styles.bodyText}>{FINALS[player.item.id - 1].tiles}</Text>
            <Text style={styles.bodyText}>{FINALS[player.item.id - 1].score}</Text>
            </View>
        )}
         />
        {/* <View style={styles.tableBody}>
            <Text style={styles.bodyText}>{PLAYERS[0].name}</Text>
            <Text style={styles.bodyText}>{PLAYERS[0].score}</Text>
            <Text style={styles.bodyText}>{FINALS[0].tiles}</Text>
            <Text style={styles.bodyText}>{FINALS[0].score}</Text>
        </View> */}
</View>

    )
}

const styles = StyleSheet.create({
    table: {
        borderWidth: 1,
        borderColor: 'white'
    },
    tableHeader: {
        flexDirection: 'row',
        width: 300,
        justifyContent: 'space-evenly',
        borderBottomWidth: 1,
        borderBottomColor: 'white'
    },
    headerText: {
        color: 'white',
        width: 70,
        textAlign: 'center'
    },
    tableBody: {
        flexDirection: 'row',
        width: 300,
        justifyContent:'space-evenly'
    },
    bodyText: {
        color: 'white',
        width: 70,
        textAlign: 'center'
    },

})

export default Scoreboard