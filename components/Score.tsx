import React, {useState, useCallback} from'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { calculateScrabbleScore } from '../utilities/scoreCalc'

const Score = () => {
    const [word, setWord] = useState('')
    const [score, setScore] = useState(0)
    const [doubles, setDoubles] = useState('');
    const [triples, setTriples] = useState('')
    const [check, setCheck] = useState<any>()

    const handleSubmit = useCallback((word: string, doubles: string, triples: string) => {
        const wordSplit = word.toUpperCase().split(' ')
        setCheck(wordSplit)
        const doublesSplit = doubles.toUpperCase().split(' ')
        const triplesSplit = triples.toUpperCase().split(' ')
        const score = calculateScrabbleScore({word:wordSplit, doubles: doublesSplit, triples: triplesSplit})
        setScore(score)
    },[word, doubles, triples])
    return (
        <View style={styles.container}>
            <TextInput style={styles.textInput} value={word} onChangeText={setWord}/>
            <TextInput style={styles.textInput}  value={doubles} onChangeText={setDoubles}/>
            <TextInput style={styles.textInput}  value={triples} onChangeText={setTriples}/>
            <TouchableOpacity onPress={()=>handleSubmit(word, doubles, triples)}>
                <Text style={styles.score}>Check Score</Text>
            </TouchableOpacity>
            <Text style={styles.score}>Score: {score}</Text>
            <Text style={styles.score}>check: {check}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'yellow',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    score: {
        color: 'white'
    }
})

export default Score