import 'react-native-gesture-handler'
import { useState } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import About from './screens/About';
import Display from './screens/Display';
import Header from './components/Header';
import WordContext from './utilities/wordContext';

const MainStack = createStackNavigator()


export default function App() {
  const [context, setContext] = useState([''])

  return (
    <WordContext.Provider value={[context, setContext]}>
      <NavigationContainer>
      <MainStack.Navigator>
        <MainStack.Screen name='Display' component={Display} options={{headerShown:false}}/>
        <MainStack.Screen name='About' component={About}/>
      </MainStack.Navigator>
      </NavigationContainer>
      {/* <Display/> */}
      {/* <SafeAreaView style={styles.container}>
      <Header/>
      <View style={styles.display}>
      // <Display/>
      </View>
      </SafeAreaView> */}
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
    flex: 5,
  },
});
