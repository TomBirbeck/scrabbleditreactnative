import React, {useState, useCallback, useEffect, useContext} from'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Switch, FlatList, SafeAreaView } from 'react-native'
import { calculateScrabbleScore } from '../utilities/scoreCalc'
import WordContext from '../utilities/wordContext'

interface ScoreProps {
setPassScore: React.Dispatch<React.SetStateAction<number>>;
finalScoreMode: boolean;
setFinalScoreMode: React.Dispatch<React.SetStateAction<boolean>>;
finalTiles: number[];
setFinalTiles: React.Dispatch<React.SetStateAction<number[]>>;
}

type wordModes = {
        name: string;
        state: boolean;
        setter: React.Dispatch<React.SetStateAction<boolean>>;
}

const WordScore = ({setPassScore, setFinalScoreMode, finalScoreMode, finalTiles, setFinalTiles}: ScoreProps) => {
    const [word, setWord] = useState('')
    const [doubles, setDoubles] = useState('')
    const [triples, setTriples] = useState('')
    const [doubleScore, setDoubleScore] = useState(false);
    const [doubleDoubleScore, setDoubleDoubleScore] = useState(false);
    const [tripleScore, setTripleScore] = useState(false);
    const [doubleTripleScore, setDoubleTripleScore] = useState(false);
    const [tripleTripleScore, setTripleTripleScore] = useState(false);
    const [allTiles, setAllTiles] = useState(false);
    const [openWordModes, setOpenWordModes] = useState(false)
    const [score, setScore] = useState(0)
    const [context, setContext] = useContext(WordContext)


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
    doubleScore && (mode = 2);
    doubleDoubleScore && (mode = 2, mode2 = 2);
    tripleScore && (mode3 = 3);
    doubleTripleScore && (mode2 = 2,mode4 = 3);
    tripleTripleScore && (mode3 = 3, mode5 = 3);
   const score = ((calculateScrabbleScore({word:wordSplit, doubles: doublesSplit, triples: triplesSplit})* mode) * mode2 * mode3 * mode4 * mode5 + extra)
    setScore(score)
  },[word, doubles, triples, doubleScore, doubleDoubleScore, tripleScore, doubleTripleScore, tripleTripleScore, allTiles])

  const handleWordSubmit = (word: string, doubles: string, triples: string) => {
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
    doubleScore && (mode = 2);
    doubleDoubleScore && (mode = 2, mode2 = 2);
    tripleScore && (mode3 = 3);
    doubleTripleScore && (mode2 = 2,mode4 = 3);
    tripleTripleScore && (mode3 = 3, mode5 = 3);
    setScore(
      (calculateScrabbleScore({word:wordSplit, doubles: doublesSplit, triples: triplesSplit})* mode) * mode2 * mode3 * mode4 * mode5 + extra);
    setPassScore(
        (calculateScrabbleScore({word:wordSplit, doubles: doublesSplit, triples: triplesSplit})* mode) * mode2 * mode3 * mode4 * mode5 + extra);
    }
    else if (finalScoreMode === true) {
        let scores = [...finalTiles]
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
  }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.score}>Word Score: {score}</Text>
            <View style={styles.bonusesContainer}>
            <Text style={styles.bonusesHeader}>Active Bonuses</Text>
            {allTiles && <Text style={styles.bonuses}>- All Tiles</Text>}
            {doubleScore ? <Text style={styles.bonuses}>- Double Word</Text>
            : doubleDoubleScore ? <Text style={styles.bonuses}>- Double Double Word</Text>
            : tripleScore ? <Text style={styles.bonuses}>- Triple Word</Text>
            : doubleTripleScore ? <Text style={styles.bonuses}>- Double Triple Word</Text>
            : tripleTripleScore ? <Text style={styles.bonuses}>- Triple Triple Word</Text>
            : null
            }
            </View>
            <View style={styles.wordModes}>
            <TouchableOpacity style={[styles.button, {backgroundColor: '#3A9366' }]} onPress={()=>handleWordCheck(word, doubles, triples)}>
            <Text style={styles.buttonText}>Check Word</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: '#3A9366' }]} onPress={()=>handleWordSubmit(word, doubles, triples)}>
            <Text style={styles.buttonText}>Submit Word</Text>
            </TouchableOpacity>
            </View>
            <TextInput style={styles.textInput} value={word} onChangeText={setWord} placeholder='Enter your word' placeholderTextColor='white'/>
            <TextInput style={styles.textInput} value={doubles} onChangeText={setDoubles} placeholder='Enter any double letters' placeholderTextColor='white'/>
            <TextInput style={styles.textInput} value={triples} onChangeText={setTriples} placeholder='Enter any triple letters' placeholderTextColor='white'/>
            <View style={styles.modesButtonContainer}>
            <TouchableOpacity style={[styles.button, {backgroundColor: '#29809E'}]} onPress={()=>{setOpenWordModes(!openWordModes)}}>
            <Text style={styles.buttonText}>Word mode selection</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: '#B1ECFA'}]} onPress={()=>{setAllTiles(!allTiles)}}>
                <Text>All Tiles Used</Text>
            </TouchableOpacity>
            </View>
            <TouchableOpacity style={[styles.button, {backgroundColor: '#F7E441', alignSelf: 'flex-end'}]} onPress={()=>{setFinalScoreMode(!finalScoreMode)}}>
            <Text>Final Score Mode</Text>
            </TouchableOpacity>
            {openWordModes && <FlatList
            style={styles.wordModesList}
            data={WORDMODES}
            keyExtractor={item=>item.name}
            renderItem={({item})=> (
                <View style={styles.wordModes}>
                    <Text style={styles.buttonText}>{item.name}</Text>
                    <Switch value={!!item.state} onValueChange={()=>{item.setter(!item.state)}}></Switch>
                </View>
            )}
            />}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 300,
    },
    textInput: {
        borderWidth: 2,
        color: 'white',
        borderColor: '#DBB684',
        padding: 5,
        borderRadius: 5,
        marginBottom: 4,
    },
    wordButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        padding: 5,
        minWidth: 120,
        maxWidth: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        margin: 2,
    },
    score: {
        color: 'white',
        textAlign: 'center',
    },
    bonusesContainer:{
        marginVertical: 4
    },
    bonusesHeader: {
        width: 96,
        color: 'white',
        marginBottom: 0.5,
        borderBottomWidth: 1,
        borderBottomColor: 'white'
    },
    bonuses: {
        color: 'white',
        marginBottom: 0.5,
    },
    wordModesList: {
    height: 250,
    },
    wordModes: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    modesButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 4,
    },
    buttonText: {
        color: 'white'
    }
})

export default WordScore