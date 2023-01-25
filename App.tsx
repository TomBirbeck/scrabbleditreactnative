import { StyleSheet, SafeAreaView } from 'react-native';
import Display from './components/Display';
import Header from './components/Header';
import Score from './components/Score';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
    <Header/>
    <Display/>
    <Score/>
    </SafeAreaView>
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
