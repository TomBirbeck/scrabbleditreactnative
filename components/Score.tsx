import React, {useState, useCallback, useEffect} from'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button } from 'react-native'
import { calculateScrabbleScore } from '../utilities/scoreCalc'

interface ScoreProps {
setContext: React.Dispatch<React.SetStateAction<string[]>>
}

const Score = ({setContext}: ScoreProps) => {
    const [word, setWord] = useState('')
    const [score, setScore] = useState(0)
    const [doubles, setDoubles] = useState('')
    const [triples, setTriples] = useState('')

    useEffect(()=>{
        setContext(word.trim().toUpperCase().split(''))
    },[word])

    const handleSubmit = useCallback((word: string, doubles: string, triples: string) => {
        const wordSplit = word.trim().toUpperCase().split('')
        const doublesSplit = doubles.trim().toUpperCase().split('')
        const triplesSplit = triples.trim().toUpperCase().split('')
        const score = calculateScrabbleScore({word:wordSplit, doubles: doublesSplit, triples: triplesSplit})
        setScore(score)
    },[word, doubles, triples])
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={()=>handleSubmit(word, doubles, triples)}>
            <Text style={styles.score}>Check Word</Text>
            </TouchableOpacity>
            <Text style={styles.score}>Score: {score}</Text>
            <TextInput style={styles.textInput} value={word} onChangeText={setWord} placeholder='Enter your word' placeholderTextColor='white'/>
            <TextInput style={styles.textInput}  value={doubles} onChangeText={setDoubles} placeholder='Enter any double letters' placeholderTextColor='white'/>
            <TextInput style={styles.textInput}  value={triples} onChangeText={setTriples} placeholder='Enter any triple letters' placeholderTextColor='white'/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        width: 300,
    },
    textInput: {
        borderWidth: 5,
        color: 'white',
        borderColor: '#DBB684',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#3A9366',
        padding: 3,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    score: {
        color: 'white'
    }
})

export default Score