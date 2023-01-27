import React, {useState, useCallback, useEffect} from'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Switch, FlatList } from 'react-native'
import { calculateScrabbleScore } from '../utilities/scoreCalc'

interface ScoreProps {
setContext: React.Dispatch<React.SetStateAction<string[]>>
}

type wordModes = {
        name: string;
        state: boolean;
        setter: React.Dispatch<React.SetStateAction<boolean>>;

}

const Score = ({setContext}: ScoreProps) => {
    const [word, setWord] = useState('')
    const [doubles, setDoubles] = useState('')
    const [triples, setTriples] = useState('')
    const [doubleScore, setDoubleScore] = useState(false);
    const [doubleDoubleScore, setDoubleDoubleScore] = useState(false);
    const [tripleScore, setTripleScore] = useState(false);
    const [doubleTripleScore, setDoubleTripleScore] = useState(false);
    const [tripleTripleScore, setTripleTripleScore] = useState(false);
    const [allTiles, setAllTiles] = useState(false);
    const [finalScoreMode, setFinalScoreMode] = useState(true);
    const [openWordModes, setOpenWordModes] = useState(false)
    const [score, setScore] = useState(0)
    const [passScore, setPassScore] = useState(0)
    const [finalTiles, setFinalTiles] = useState<number[]>([]);


    const WORDMODES: wordModes[]= [
        {name: 'Double Word', state: doubleScore, setter: setDoubleScore},
        {name: 'Double Double Word', state: doubleDoubleScore, setter: setDoubleDoubleScore},
        {name: 'Triple Word', state: tripleScore, setter: setTripleScore},
        {name: 'Double Triple Word', state: doubleTripleScore, setter: setDoubleTripleScore},
        {name: 'Triple Triple Word', state: tripleTripleScore, setter: setTripleTripleScore},
    ]

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

    const handleWordCheck = useCallback((word: string, doubles: string, triples: string) => {
        const wordSplit = word.trim().toUpperCase().split('')
        const doublesSplit = doubles.trim().toUpperCase().split('')
        const triplesSplit = triples.trim().toUpperCase().split('')
    let mode = 1;
    let mode2 = 1;
    let mode3 = 1;
    let mode4 = 1;
    let mode5 = 1;
    let extra = 0;
    allTiles ? (extra = 50): extra = 0;
    doubleScore ? (mode = 2) : mode = 1;
    doubleDoubleScore ? (mode2 = 2) :  (mode2 = 1);
    tripleScore ? (mode3 = 3) : (mode3 = 1);
    doubleTripleScore ? (mode4 = 3) : (mode4 = 1);
    tripleTripleScore ? (mode5 = 3) : (mode5 = 1);
   const score = ((calculateScrabbleScore({word:wordSplit, doubles: doublesSplit, triples: triplesSplit})* mode) * mode2 * mode3 * mode4 * mode5 + extra)
    setScore(score)
  },[word, doubles, triples, doubleScore, doubleDoubleScore, tripleScore, doubleTripleScore, tripleTripleScore])

  const handleWordSubmit = useCallback((word: string, doubles: string, triples: string) => {
        const wordSplit = word.trim().toUpperCase().split('')
        const doublesSplit = doubles.trim().toUpperCase().split('')
        const triplesSplit = triples.trim().toUpperCase().split('')
    if (finalScoreMode === false) {
    let mode = 1;
    let mode2 = 1;
    let mode3 = 1;
    let mode4 = 1;
    let mode5 = 1;
    let extra = 0;
    allTiles ? extra = 50: extra = 0;
    doubleScore ? (mode = 2) :  (mode = 1);
    doubleDoubleScore ? (mode2 = 2) :  (mode2 = 1);
    tripleScore ? (mode3 = 3) : (mode3 = 1);
    doubleTripleScore ? (mode4 = 3) : (mode4 = 1);
    tripleTripleScore ? (mode5 = 3) : (mode5 = 1);
    setScore(
      (calculateScrabbleScore({word:wordSplit, doubles: doublesSplit, triples: triplesSplit})* mode) * mode2 * mode3 * mode4 * mode5 + extra);
    setPassScore(
        (calculateScrabbleScore({word:wordSplit, doubles: doublesSplit, triples: triplesSplit})* mode) * mode2 * mode3 * mode4 * mode5 + extra);
    }
    if (finalScoreMode === true) {
    let scores = finalTiles
        scores.push((calculateScrabbleScore({word:wordSplit, doubles: doublesSplit, triples: triplesSplit})))
      setFinalTiles(scores)
    }
      setWord('');
    setDoubles('');
    setTriples('');
    setScore(0);
    setDoubleScore(false);
    setDoubleDoubleScore(false)
    setTripleScore(false);
    setDoubleTripleScore(false);
    setTripleTripleScore(false);
    setAllTiles(false);
  }, [score, passScore])

  console.log(finalTiles)

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.modeButton} onPress={()=>{setOpenWordModes(!openWordModes)}}>
            <Text style={styles.score}>Word mode selection</Text>
            </TouchableOpacity>
            {openWordModes && <FlatList
            style={styles.wordModesList}
            data={WORDMODES}
            keyExtractor={item=>item.name}
            renderItem={({item})=> (
                <View style={styles.wordModes}>
                    <Text style={styles.score}>{item.name}</Text>
                    <Switch value={!!item.state} onValueChange={()=>{item.setter(!item.state)}}></Switch>
                </View>
            )}
            />}
            <TouchableOpacity style={styles.checkButton} onPress={()=>handleWordCheck(word, doubles, triples)}>
            <Text style={styles.score}>Check Word</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton} onPress={()=>handleWordSubmit(word, doubles, triples)}>
            <Text style={styles.score}>Submit Word</Text>
            </TouchableOpacity>
            <Text style={styles.score}>Score: {score}</Text>
            <TextInput style={styles.textInput} value={word} onChangeText={setWord} placeholder='Enter your word' placeholderTextColor='white'/>
            <TextInput style={styles.textInput} value={doubles} onChangeText={setDoubles} placeholder='Enter any double letters' placeholderTextColor='white'/>
            <TextInput style={styles.textInput} value={triples} onChangeText={setTriples} placeholder='Enter any triple letters' placeholderTextColor='white'/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
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
    checkButton: {
        backgroundColor: '#3A9366',
        padding: 5,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    submitButton: {
        backgroundColor: '#3A9366',
        padding: 5,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    modeButton: {
        backgroundColor: '#29809E',
        padding: 5,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    score: {
        color: 'white'
    },
    wordModesList: {
    height: 250,
    },
    wordModes: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})

export default Score