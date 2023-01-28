import { useState } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import Display from './components/Display';
import Header from './components/Header';
import WordContext from './utilities/wordContext';

export default function App() {
  const [context, setContext] = useState([''])
  return (
    <WordContext.Provider value={[context, setContext]}>
      <SafeAreaView style={styles.container}>
      <Header/>
      <View style={styles.display}>
      <Display/>
      </View>
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
  },
  display: {
    flex: 2,
  },
});
