import React, {useState, useCallback, useEffect} from'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { calculateScrabbleScore } from '../utilities/scoreCalc'

interface ScoreProps {
setContext: React.Dispatch<React.SetStateAction<string[]>>
}

const Score = ({setContext}: ScoreProps) => {
    const [word, setWord] = useState('')
    const [score, setScore] = useState(0)
    const [doubles, setDoubles] = useState('')
    const [triples, setTriples] = useState('')
    const [check, setCheck] = useState<any>()

    useEffect(()=>{
        setContext(word.trim().toUpperCase().split(''))
    },[word])

    const handleSubmit = useCallback((word: string, doubles: string, triples: string) => {
        const wordSplit = word.trim().toUpperCase().split('')
        setCheck(wordSplit)
        const doublesSplit = doubles.trim().toUpperCase().split('')
        const triplesSplit = triples.trim().toUpperCase().split('')
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
        width: 300,
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