import {useState} from 'react'
import { StyleSheet, SafeAreaView } from 'react-native';
import Display from './components/Display';
import Header from './components/Header';
import Score from './components/Score';
import Scoreboard from './components/Scoreboard';
import WordContext from './utilities/wordContext';

export default function App() {
  const [context, setContext] = useState([''])

  return (
    <WordContext.Provider value={context}>
    <SafeAreaView style={styles.container}>
    <Header/>
    <Display/>
    <Score setContext={setContext}/>
    <Scoreboard/>
    </SafeAreaView>
    </WordContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#26584C',
    alignItems: 'center',
    marginTop: 20,
    // justifyContent: 'center',
  },
});
