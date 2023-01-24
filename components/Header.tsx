import React from 'react'
import { StyleSheet, Text, View} from 'react-native';

const Header: React.FC = () => {

    return (
        <View style={styles.container}>
            <View style={styles.bannerContainer}>
          <Text style={styles.bannerText}>Scrabbledit</Text>
          </View>
          <Text style={styles.motto}>We can't trust Barry with the scores again</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   backgroundColor: '#26584C',
      alignItems: 'center',
      // justifyContent: 'center',
    },
    bannerContainer: {
      backgroundColor: '#E53E48',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop: 4,
    },
    bannerText: {
      color: 'white',
      fontSize: 25,
      fontWeight: 'bold'
    },
    motto: {
      color: 'white',
      fontWeight: 'bold',
      marginTop: 5,
    }
  });

  export default Header