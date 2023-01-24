import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Header from './components/Header';
import Score from './components/Score';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
    <Header/>
    <Score/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#26584C',
    alignItems: 'center',
    // justifyContent: 'center',
  },
});
